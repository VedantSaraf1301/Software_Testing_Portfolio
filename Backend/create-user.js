require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/user.model");

const NAME = "Vedant";
const EMAIL = "vedant@gmail.com";
const PASSWORD = "password123";

async function createUser() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");

  const existing = await User.findOne({ email: EMAIL });
  if (existing) {
    console.log("User already exists:", EMAIL);
    process.exit(0);
  }

  const hashed = await bcrypt.hash(PASSWORD, 10);
  const user = await User.create({ name: NAME, email: EMAIL, password: hashed });
  console.log("✅ User created successfully!");
  console.log("   Email   :", EMAIL);
  console.log("   Password:", PASSWORD);
  process.exit(0);
}

createUser().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
