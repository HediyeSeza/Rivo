import type { InputHTMLAttributes } from "react";
import "./Input.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = ({
  label,
  error,
  helperText,
  className = "",
  type = "text",
  disabled = false,
  ...props
}: InputProps) => {
  return (
    <div className={`input-wrapper ${error ? "input-wrapper--error" : ""}`}>
      {label && <label className="input-label">{label}</label>}

      <input
        className={`input ${className}`}
        type={type}
        disabled={disabled}
        {...props}
      />

      {error && <span className="input-error">{error}</span>}

      {!error && helperText && (
        <span className="input-helper">{helperText}</span>
      )}
    </div>
  );
};

export default Input;
