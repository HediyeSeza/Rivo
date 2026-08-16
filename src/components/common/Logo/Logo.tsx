import "./Logo.css";

import { useTheme } from "../../../context/ThemeContext";
import lightLogo from "../../../assets/icons/Light/Rivo.png";
import darkLogo from "../../../assets/icons/Dark/Rivo.png";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 32, className = "" }: LogoProps) => {
  const { theme } = useTheme();

  return (
    <img
      className={`logo ${className}`}
      src={theme === "dark" ? darkLogo : lightLogo}
      alt="Rivo"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Logo;


