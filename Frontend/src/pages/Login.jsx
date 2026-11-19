import { useState } from "react";
import { loginUser, registerUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "../css/Login.css";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [isSignup, setIsSignup] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage("");
  };

  const switchMode = () => {
    setIsSignup((prev) => !prev);
    setErrorMessage("");
    setSuccessMessage("");
    setFormData({ name: "", email: "", password: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    try {
      let response;
      if (isSignup) {
        response = await registerUser(formData);
      } else {
        response = await loginUser(formData);
      }

      login(response.data);

      setSuccessMessage(
        isSignup ? "Account created! Redirecting..." : "Login successful. Redirecting..."
      );

      if (!isSignup && rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      setTimeout(() => navigate("/home"), 500);
    } catch (error) {
      const backendMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="inventro-login-page">
      {/* LEFT SIDE */}
      <section className="inventro-login-visual">
        <div className="inventro-visual-overlay"></div>

        <div className="inventro-brand inventro-brand-left">
          <div className="inventro-brand-icon">
            <span></span>
            <span></span>
          </div>

          <div>
            <h2>Inventro</h2>
            <p>Inventory Management</p>
          </div>
        </div>

        <div className="inventro-visual-content">
          <span className="inventro-small-label">
            INVENTORY MANAGEMENT
          </span>

          <h1>
            Smarter Inventory
            <br />
            for a <span>Brighter</span>
            <br />
            Tomorrow
          </h1>

          <p className="inventro-visual-description">
            Manage your products, track sales, handle inventory
            and grow your business — all in one place.
          </p>

          <div className="inventro-feature-list">
            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">✓</div>
              <div>
                <h3>Keep Track</h3>
                <p>Monitor your stock in real-time</p>
              </div>
            </div>

            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">↗</div>
              <div>
                <h3>Boost Sales</h3>
                <p>Make better business decisions</p>
              </div>
            </div>

            <div className="inventro-feature-item">
              <div className="inventro-feature-icon">♙</div>
              <div>
                <h3>Grow Faster</h3>
                <p>Serve your customers better</p>
              </div>
            </div>
          </div>
        </div>

        <div className="inventro-bottom-quote">
          Small Business
          <br />
          <strong>Big Possibilities</strong>
        </div>
      </section>

      {/* RIGHT SIDE */}
      <section className="inventro-login-panel">
        <div className="inventro-top-slogan">
          <span>Organize</span>
          <span>Track</span>
          <span>Grow</span>
        </div>

        <div className="inventro-login-card">
          <div className="inventro-mobile-brand">
            <div className="inventro-brand-icon">
              <span></span>
              <span></span>
            </div>

            <div>
              <h2>Inventro</h2>
              <p>Inventory Management</p>
            </div>
          </div>

          <div className="inventro-login-heading">
            <h1>{isSignup ? "Create Account" : "Welcome Back"}</h1>
            <p>{isSignup ? "Sign up to get started" : "Log in to your account to continue"}</p>
          </div>

          {/* ERROR */}
          {errorMessage && (
            <div className="inventro-login-error">
              <div className="inventro-error-icon">!</div>
              <div>
                <strong>{isSignup ? "Sign up failed" : "Login failed"}</strong>
                <p>{errorMessage}</p>
              </div>
            </div>
          )}

          {/* SUCCESS */}
          {successMessage && (
            <div className="inventro-login-success">
              <span>✓</span>
              {successMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* NAME — signup only */}
            {isSignup && (
              <div className="inventro-form-group">
                <label htmlFor="inventro-name">Full Name</label>
                <div className="inventro-input-wrapper">
                  <span className="inventro-input-icon">👤</span>
                  <input
                    id="inventro-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                  />
                </div>
              </div>
            )}

            {/* EMAIL */}
            <div className="inventro-form-group">
              <label htmlFor="inventro-email">Email</label>
              <div className="inventro-input-wrapper">
                <span className="inventro-input-icon">✉</span>
                <input
                  id="inventro-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div className="inventro-form-group">
              <label htmlFor="inventro-password">Password</label>
              <div className="inventro-input-wrapper">
                <span className="inventro-input-icon">🔒</span>
                <input
                  id="inventro-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isSignup ? "Min. 6 characters" : "Enter your password"}
                  autoComplete={isSignup ? "new-password" : "current-password"}
                  required
                />
                <button
                  type="button"
                  className="inventro-password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>
            </div>

            {/* OPTIONS — login only */}
            {!isSignup && (
              <div className="inventro-login-options">
                <label className="inventro-remember">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="inventro-checkmark">✓</span>
                  <span>Remember me</span>
                </label>

                <button
                  type="button"
                  className="inventro-forgot-button"
                  onClick={() =>
                    setErrorMessage(
                      "Please contact your administrator to reset your password."
                    )
                  }
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="inventro-login-button"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="inventro-spinner"></span>
                  {isSignup ? "Creating account..." : "Logging in..."}
                </>
              ) : (
                <>
                  {isSignup ? "Create Account" : "Log In"}
                  <span>→</span>
                </>
              )}
            </button>
          </form>

          <div className="inventro-login-divider">
            <span></span>
            <p>or</p>
            <span></span>
          </div>

          <p className="inventro-admin-text">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
            <span
              onClick={switchMode}
              style={{
                cursor: "pointer",
                marginLeft: "6px",
                fontWeight: 600,
                textDecoration: "underline",
              }}
            >
              {isSignup ? "Log In" : "Sign Up"}
            </span>
          </p>
        </div>

        <div className="inventro-login-footer">
          <span>🌿</span>
          Better Tools
          <b>|</b>
          Smarter Work
          <b>|</b>
          Bigger Tomorrows
        </div>
      </section>
    </div>
  );
}

export default Login;
