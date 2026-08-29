import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import backIcon from "../../../assets/icons/Light/back.svg";
import eyeIcon from "../../../assets/icons/Light/eye.svg";
import closeEyeIcon from "../../../assets/icons/Light/close-eye.svg";
import { login } from "../../../services/authApi";
import { ApiError } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import "./LoginForm.css";

const LoginForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      setServerError("");
      setIsSubmitting(true);
      try {
        const result = await login(formData);
        signIn(result.user, result.token);
        // Give a moment for state to update before navigating
        setTimeout(() => navigate("/"), 100);
      } catch (error) {
        console.error("Login error:", error);
        
        if (error instanceof ApiError) {
          if ([401, 404].includes(error.status)) {
            setServerError("This account does not exist or the password is incorrect.");
          } else if (error.status === 429) {
            setServerError("Too many login attempts. Please try again later.");
          } else if (error.status >= 500) {
            setServerError("Server error. Please try again later.");
          } else {
            setServerError(error.message || "Unable to log in. Please try again.");
          }
        } else if (error instanceof TypeError) {
          setServerError("Network error. Please check your connection and try again.");
        } else {
          setServerError(
            error instanceof Error
              ? error.message
              : "Unable to log in. Please try again.",
          );
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="login-form-main">
      <div className="login-form-container">
        <div className="login-form-wrapper">
          <div className="login-form-content">
            <div className="login-form-header">
              <button
                type="button"
                className="login-form-back-button"
                onClick={handleBackHome}
                aria-label="Back to home"
              >
                <img src={backIcon} alt="Back" />
              </button>
              <h1 className="login-form-title">Welcome back</h1>
            </div>
            <p className="login-form-subtitle">
              Login to your Socially account
            </p>

            <form className="login-form" onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

              {serverError && <p className="input-error">{serverError}</p>}

              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
                rightIcon={
                  <img
                    src={showPassword ? closeEyeIcon : eyeIcon}
                    alt={showPassword ? "Hide password" : "Show password"}
                  />
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="login-form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </Button>
            </form>

            <div className="login-form-footer">
              <span className="login-form-footer-text">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="login-form-link"
                  onClick={handleSignUp}
                >
                  Sign up
                </button>
              </span>
            </div>
          </div>

          <div className="login-form-image-placeholder">
            <img
              src={theme === "dark" ? "/Rivo-dark.png" : "/Rivo.png"}
              alt="Rivo Logo"
              className="login-form-image"
            />
          </div>
        </div>
      </div>

      <div className="login-form-policy">
        <p>
          By clicking continue, you agree to our{" "}
          <a href="#terms" className="login-form-policy-link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#privacy" className="login-form-policy-link">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
