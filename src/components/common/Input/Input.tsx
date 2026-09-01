import type { InputHTMLAttributes, ReactNode } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  rightIcon?: ReactNode;
  onRightIconClick?: () => void;
}

const Input = ({
  label,
  error,
  helperText,
  className = "",
  type = "text",
  disabled = false,
  rightIcon,
  onRightIconClick,
  ...props
}: InputProps) => {
  return (
    <div className={`input-wrapper ${error ? "input-wrapper--error" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <div className="input-container">
        <input
          className={`input ${className}`}
          type={type}
          disabled={disabled}
          {...props}
        />
        {rightIcon && (
          <button
            type="button"
            className="input-right-icon"
            onClick={onRightIconClick}
            tabIndex={-1}
          >
            {rightIcon}
          </button>
        )}
      </div>

      {error && <span className="input-error">{error}</span>}

      {!error && helperText && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  );
};

export default Input;
