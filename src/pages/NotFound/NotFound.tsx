import { useNavigate } from "react-router-dom";
import "./NotFound.css";

import { useTheme } from "../../context/ThemeContext";

import LightLogo from "../../assets/logo/Rivo-light.png";
import DarkLogo from "../../assets/logo/Rivo-dark.png";

import HomeIcon from "../../assets/icons/Light/homee.svg";
import CompassIcon from "../../assets/icons/Light/compass.svg";
import EmailIcon from "../../assets/icons/Light/email.svg";

const NotFound = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const logo = theme === "dark" ? DarkLogo : LightLogo;

  return (
    <main className="not-found">
      <section className="not-found__hero">
        {/* Background Logo */}
        <img
          src={logo}
          alt=""
          aria-hidden="true"
          className="not-found__logo-bg"
        />

        {/* Main Content */}
        <div className="not-found__content">
          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>
            Oops! The page you're looking for
            <br />
            doesn't exist or has been moved.
          </p>

          <button
            type="button"
            onClick={() => navigate("/")}
          >
            <img
              src={HomeIcon}
              alt=""
              className="not-found__button-icon"
            />

            <span>Go Home</span>
          </button>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="not-found__actions">
        <button
          type="button"
          onClick={() => navigate("/")}
        >
          <span className="not-found__icon">
            <img src={HomeIcon} alt="" />
          </span>

          <div>
            <strong>Back to Home</strong>
            <small>Go back to the homepage</small>
          </div>
        </button>

        <button type="button">
          <span className="not-found__icon">
            <img src={CompassIcon} alt="" />
          </span>

          <div>
            <strong>Explore</strong>
            <small>Discover new content</small>
          </div>
        </button>

        <button type="button">
          <span className="not-found__icon">
            <img src={EmailIcon} alt="" />
          </span>

          <div>
            <strong>Contact Us</strong>
            <small>We're here to help</small>
          </div>
        </button>
      </section>

      <footer className="not-found__footer">
        © 2025 Socially. All rights reserved.
      </footer>
    </main>
  );
};

export default NotFound;