import React, { useState } from "react";
import "./Input.css";

export type InputTypes =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "time"
  | "datetime-local"
  | "file"
  | "url"
  | "tel"
  | "search";

export interface InputFieldProps {
  id?: string;
  type?: InputTypes;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  errorMsg?: string;
  name?: string;
  rightIcon?: string;
  enablePasswordToggle?: boolean; // Toggle control
}

const InputField: React.FC<InputFieldProps> = ({
  id = "input-basic",
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
  disabled = false,
  errorMsg,
  name,
  rightIcon,
  enablePasswordToggle = true, // default enabled
  ...props
}) => {

  // Password Toggle State
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password" && enablePasswordToggle;

  const finalType = isPasswordField
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="custom-input-wrapper">
      <div className="input-field">

        <input
          id={id}
          name={name || id}
          type={finalType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-control ${className}`}
          {...props}
        />

        {/* Password Toggle Icon */}
        {isPasswordField && rightIcon && (
          <span
            className="input-right-icon"
            onClick={() => setShowPassword(!showPassword)}
            style={{ cursor: "pointer" }}
          >
            <img src={rightIcon} alt="toggle password" />
          </span>
        )}

        {/* Normal Right Icon (Non Password Fields) */}
        {!isPasswordField && rightIcon && (
          <span className="input-right-icon">
            <img src={rightIcon} alt="icon" />
          </span>
        )}

      </div>

      {errorMsg && <p className="input-error">{errorMsg}</p>}
    </div>
  );
};

export default InputField;
