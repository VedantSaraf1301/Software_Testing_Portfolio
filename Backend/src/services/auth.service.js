const bcrypt = require("bcryptjs");

const User = require("../models/user.model");
const generateToken = require("../utils/generateToken.utils");

const loginUser = async (loginData) => {
  const { email, password } = loginData;

  // Validate input
  if (!email || !password) {
    throw new Error("Email and Password are required");
  }

  // Find user
  const user = await User.findOne({
    email: email.toLowerCase().trim(),
  });

  if (!user) {
    throw new Error("Invalid Email or Password");
  }

  // Compare password
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new Error("Invalid Email or Password");
  }

  // Generate token
  const token = generateToken(user._id);

  // Remove password from response
  const userData = user.toObject();
  delete userData.password;

  return {
    user: userData,
    token,
  };
};

const registerUser = async (registerData) => {
  const { name, email, password } = registerData;

  if (!name || !email || !password) {
    throw new Error("Name, Email and Password are required");
  }

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    throw new Error("An account with this email already exists");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashed,
  });

  const token = generateToken(user._id);
  const userData = user.toObject();
  delete userData.password;

  return { user: userData, token };
};

module.exports = {
  loginUser,
  registerUser,
};