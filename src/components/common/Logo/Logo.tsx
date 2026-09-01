import "./Logo.css";

import { useTheme } from "../../../context/ThemeContext";

import LightLogo from "../../../assets/logo/Rivo-light.png";
import DarkLogo from "../../../assets/logo/Rivo-dark.png";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 32, className = "" }: LogoProps) => {
  const { theme } = useTheme();

  const logo = theme === "dark" ? DarkLogo : LightLogo;

  return (
    <img
      className={`logo ${className}`}
      src={logo}
      alt="Rivo"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Logo;