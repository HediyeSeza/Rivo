import "./Logo.css";

import lightLogo from "../../../assets/icons/Light/Rivo.png";
import darkLogo from "../../../assets/icons/Dark/Rivo.png";
import { useTheme } from "../../../context/ThemeContext";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({ size = 32, className = "" }: LogoProps) => {
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const logoSrc = isDark ? darkLogo : lightLogo;

  return (
    <img
      className={`logo ${className}`}
      src={logoSrc}
      alt="Rivo"
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default Logo;
