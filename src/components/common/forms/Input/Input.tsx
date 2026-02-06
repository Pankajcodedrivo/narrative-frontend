import React from "react";
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
  rightIcon?: string; // 👈 image path
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
  ...props
}) => {
  return (
    <div className="custom-input-wrapper">
      <div className="input-field">
        <input
          id={id}
          name={name || id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`form-control ${className}`}
          {...props}
        />

        {rightIcon && (
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
