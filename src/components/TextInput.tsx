import React, { useState, useEffect } from "react";
import { useDebounce } from "../hooks/useDebounce";

export interface TextInputProps {
  label: string;
  name: string;
  type?: "text" | "number"; // Support for text and number input types
  placeholder?: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  allowSpecialChars?: boolean;
  allowSpaces?: boolean;
  transformToUppercase?: boolean;
  allowNumbers?: boolean;
  min?: number; // Min value for number input
  max?: number; // Max value for number input
  onInputChange?: (name: string, value: string) => void;
  onError?: (name: string, error: string) => void;
  isSubmitted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  containerClassName?: string; // Additional class for container div
  labelClassName?: string; // Additional class for label
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  type = "text", // Default type is text
  placeholder = `Enter ${label}`,
  required,
  minLength,
  maxLength,
  allowSpecialChars = true,
  allowSpaces = true,
  transformToUppercase = false,
  allowNumbers = true,
  min,
  max,
  onInputChange,
  onError = () => {},
  isSubmitted,
  className = "",
  style = {},
  containerClassName = "", // Default container class
  labelClassName = "", // Default label class
}) => {
  const [value, setValue] = useState<string | number>("");
  const [error, setError] = useState<string>("");
  const [showError, setShowError] = useState<boolean>(false); // New state to control error visibility
  const debouncedValue = useDebounce(value, 300);

  // Helper function to validate input based on type
  const validateInput = (input: string | number): string => {
    let errorMsg = "";

    if (type === "text") {
      if (minLength && (input as string).length < minLength) {
        errorMsg = `${label} must be at least ${minLength} characters.`;
      } else if (maxLength && (input as string).length > maxLength) {
        errorMsg = `${label} must not exceed ${maxLength} characters.`;
      } else if (!allowSpecialChars && /[!@#$%^&*(),.?":{}|<>]/.test(input as string)) {
        errorMsg = `${label} cannot contain special characters.`;
      } else if (!allowSpaces && /\s/.test(input as string)) {
        errorMsg = `${label} cannot contain spaces.`;
      } else if (!allowNumbers && /\d/.test(input as string)) {
        errorMsg = `${label} cannot contain numbers.`;
      }
    } else if (type === "number") {
      const numericValue = Number(input);
      if (min !== undefined && numericValue < min) {
        errorMsg = `${label} must be at least ${min}.`;
      } else if (max !== undefined && numericValue > max) {
        errorMsg = `${label} must not exceed ${max}.`;
      }
    }

    return errorMsg;
  };

  // Handle debounced input validation
  useEffect(() => {
    let errorMsg = "";
    

    if (debouncedValue !== "") {
      errorMsg = validateInput(debouncedValue);
    }

    setError(errorMsg);
    setShowError(errorMsg !== ""); // Show error only when there's an error
    onError(name, errorMsg);
    onInputChange?.(name, debouncedValue);
  }, [
    debouncedValue,
    minLength,
    maxLength,
    allowSpecialChars,
    allowSpaces,
    allowNumbers,
    type,
    min,
    max,
    label,
    name,
    onInputChange,
  ]);

  // Handle validation on form submission
  useEffect(() => {
    if (isSubmitted) {
      
      let errorMsg = "";

      if (required && value.toString().trim() === "") {
        errorMsg = `${label} is required.`;
      } else {
        errorMsg = validateInput(value);
      }

      setError(errorMsg);
      setShowError(errorMsg !== ""); // Ensure error stays visible after submission
      onError(name, errorMsg);
    }
  }, [
    isSubmitted,
    value,
    required,
    minLength,
    maxLength,
    allowSpecialChars,
    allowSpaces,
    allowNumbers,
    type,
    min,
    max,
    label,
    name,
    onError,
  ]);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string | number = e.target.value;

    // Handle uppercase transformation for text inputs
    if (type === "text" && transformToUppercase) {
      inputValue = (inputValue as string).toUpperCase();
    }

    setValue(inputValue);
    setShowError(false); // Hide error on user input
  };

  return (
    <div className={`${containerClassName} mb-4 relative`}>
      <label htmlFor={name} className={`${labelClassName} block text-sm font-medium text-gray-700`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={`${className} mt-1 py-2 px-3 focus:outline-none block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        style={style}
      />

      {showError && error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;