import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import backIcon from "../../../assets/icons/Light/back.svg";
import eyeIcon from "../../../assets/icons/Light/eye.svg";
import closeEyeIcon from "../../../assets/icons/Light/close-eye.svg";
import { register } from "../../../services/authApi";
import { ApiError } from "../../../services/api";
import { useAuth } from "../../../context/AuthContext";
import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
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

    if (!formData.name) {
      newErrors.name = "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

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
        const result = await register(formData);
        signIn(result.user, result.token);
        navigate("/");
      } catch (error) {
        if (error instanceof ApiError) {
          if (error.status === 409) {
            setServerError("An account with this email already exists.");
          } else {
            setServerError("An error occurred. Please try again.");
          }
        } else {
          setServerError("An error occurred. Please try again.");
        }
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  const handleBackHome = () => {
    navigate("/");
  };

  return (
    <div className="register-form-main">
      <div className="register-form-container">
        <div className="register-form-wrapper">
          <div className="register-form-content">
            <div className="register-form-header">
              <button
                type="button"
                className="register-form-back-button"
                onClick={handleBackHome}
                aria-label="Back to home"
              >
                <img src={backIcon} alt="Back" />
              </button>
              <h1 className="register-form-title">Create your account</h1>
            </div>
            <p className="register-form-subtitle">
              Enter your details below to create your account
            </p>

            {serverError && (
              <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-950">
                <p className="text-sm font-medium text-red-900 dark:text-red-100">
                  {serverError}
                </p>
              </div>
            )}

            <form className="register-form" onSubmit={handleSubmit}>
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
              />

              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="m@example.com"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
              />

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
                className="register-form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Creating account..." : "Create Account"}
              </Button>
            </form>

            <div className="register-form-footer">
              <span className="register-form-footer-text">
                Already have an account?{" "}
                <button
                  type="button"
                  className="register-form-link"
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              </span>
            </div>
          </div>

          <div className="register-form-image-placeholder">
            <img
              src={theme === "dark" ? "/Rivo-dark.png" : "/Rivo.png"}
              alt="Rivo Logo"
              className="register-form-image"
            />
          </div>
        </div>
      </div>

      <div className="register-form-policy">
        <p>
          By clicking continue, you agree to our{" "}
          <a href="#terms" className="register-form-policy-link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#privacy" className="register-form-policy-link">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
