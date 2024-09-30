import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export interface EmailInputProps {
  label: string;
  name: string;
  placeholder?: string;
  required?: boolean;
  onInputChange?: (name: string, value: string) => void;
  onError?: (name: string, error: string) => void;
  isSubmitted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string; // Additional class for container div
  labelClassName?: string; // Additional class for label
}

const EmailInput: React.FC<EmailInputProps> = ({
  label = "Email",
  name,
  placeholder = `Enter your ${label}`,
  required = false,
  onInputChange,
  onError = () => {},
  isSubmitted,
  className = "",
  style = {},
  containerClassName = "",
  labelClassName = "",
}) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const debouncedValue = useDebounce(value, 800)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Helper function to validate email

  useEffect(() => {
    let errorMsg = "";

    if (debouncedValue.trim() === "") {
      errorMsg = "";
    } else if (!emailRegex.test(debouncedValue)){
      errorMsg = `${name} is not valid`
    }

    setError(errorMsg);
    onError(name, errorMsg);
    onInputChange?.(name, value);
  }, [debouncedValue, label, name, onInputChange]);

  // Handle validation on form submission
  useEffect(() => {
    if (isSubmitted) {
      let requiredError = "";
      if (required && value.trim()===""){
        requiredError = `${label} is required.`
      }
      setError(requiredError);
      onError(name, requiredError);
    } else{
      if (!required && value.trim() !== '' && emailRegex.test(value)){
        setError("");
        onError(name, "");
      }
    }
  }, [isSubmitted, value, required, label, name, onError]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={`${containerClassName} mb-4 relative`}>
      <label htmlFor={name} className={`${labelClassName} block text-sm font-medium text-gray-700`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="email"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`${className} mt-1 py-2 px-3 focus:outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm `}
        style={style}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default EmailInput;