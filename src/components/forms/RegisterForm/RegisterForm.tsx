import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext";
import Button from "../../common/Button/Button";
import Input from "../../common/Input/Input";
import "./RegisterForm.css";

const RegisterForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      // TODO: Implement registration logic
      console.log("Register:", formData);
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
            <button
              type="button"
              className="register-form-back-button"
              onClick={handleBackHome}
              aria-label="Back to home"
            >
              ← Home
            </button>
            <h1 className="register-form-title">Create your account</h1>
            <p className="register-form-subtitle">
              Enter your email below to create your account
            </p>

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
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                error={errors.password}
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                className="register-form-submit"
              >
                Create Account
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
