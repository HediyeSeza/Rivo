import type {
  ButtonHTMLAttributes,
  ReactNode,
} from 'react';

import './Button.css';

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'pure';

type ButtonSize = 'large' | 'small';

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children: ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'large',
  icon,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={`button button--${variant} button--${size} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && (
        <span className="button__icon">
          {icon}
        </span>
      )}

      <span className="button__content">
        {children}
      </span>
    </button>
  );
};

export default Button;