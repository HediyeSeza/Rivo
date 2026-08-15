import { useNavigate } from "react-router-dom";
import Button from "../common/Button/Button";
import "./WelcomeSection.css";

const WelcomeSection = () => {
  const navigate = useNavigate();

  return (
    <aside className="welcome-section">
      <div className="welcome-section-content">
        <div className="welcome-section-header">
          <h2 className="welcome-section-title">Welcome Back!</h2>
          <p className="welcome-section-subtitle">
            Sign in to access your profile and connect with others.
          </p>
        </div>

        <div className="welcome-section-buttons">
          <Button
            variant="secondary"
            size="large"
            className="welcome-section-button welcome-section-signin-btn"
            onClick={() => navigate("/login")}
          >
            Sign in
          </Button>

          <Button
            variant="primary"
            size="large"
            className="welcome-section-button"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </div>

        {/* <div className="welcome-section-divider" /> */}

        {/* <div className="welcome-section-footer">
          <p className="welcome-section-footer-text">
            By continuing, you agree to our{" "}
            <a href="#terms" className="welcome-section-link">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#privacy" className="welcome-section-link">
              Privacy Policy
            </a>
            .
          </p>
        </div> */}
      </div>
    </aside>
  );
};

export default WelcomeSection;
