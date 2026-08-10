import './Input.css';

interface InputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

const Input = ({
  label,
  placeholder,
  value,
  disabled = false,
  error,
  helperText,
}: InputProps) => {
  return (
    <div className={`input-wrapper ${error ? 'input-wrapper--error' : ''}`}>
      {label && (
        <label className="input-label">
          {label}
        </label>
      )}

      <input
        className="input"
        type="text"
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        readOnly={value !== undefined}
      />

      {error && (
        <span className="input-error">
          {error}
        </span>
      )}

      {!error && helperText && (
        <span className="input-helper">
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;