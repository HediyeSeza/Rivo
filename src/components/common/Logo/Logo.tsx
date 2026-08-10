import './Logo.css';

import logo from '../../../assets/logo/Rivo.svg';

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo = ({
  size = 32,
  className = '',
}: LogoProps) => {
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