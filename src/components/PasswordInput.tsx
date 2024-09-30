import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useDebounce } from '../hooks/useDebounce';

interface PasswordInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
  minLength?: number;
  onInputChange?: (name: string, value: string) => void;
  onError?: (name: string, error: string) => void;
  isSubmitted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  toggleVisibility?: boolean; // Control visibility tog
}

function PasswordInput({
  label = "Password",
  name,
  placeholder = `Enter your ${label}`,
  required = false,
  containerClassName ='',
  labelClassName ='',
  minLength = 8,
  onInputChange,
  onError = () => {},
  isSubmitted = false,
  className = "",
  style = {},
  toggleVisibility = true, // Default to true
}: PasswordInputProps) {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const debouncedValue = useDebounce(value, 800)

  // Password validation logic
  useEffect(() => {
    let errorMsg = "";
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;

    if (debouncedValue.trim() === "") {
      errorMsg = "";
    } else if (debouncedValue.length < minLength) {
      errorMsg = `${label} must be at least ${minLength} characters long.`;
    } else if (!passwordRegex.test(debouncedValue)) {
      errorMsg =
        "Password must be at least 8 characters long and include upper, lower case letters and a number.";
    }

    setError(errorMsg);
    onError(name, errorMsg);
    onInputChange?.(name, debouncedValue);
  }, [debouncedValue, minLength, label, name, onInputChange]);

  // Handle validation when the form is submitted
  useEffect(() => {
    if (isSubmitted) {
      if (required && value.trim() === "") {
        const requiredError = `${label} is required.`;
        setError(requiredError);
        onError(name, requiredError);
      } else {
        setError("");
        onError(name, "");
      }
    }
  }, [isSubmitted, required, minLength, value, label, name, onError]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
    <div className={`${containerClassName} mb-4 relative`}>
      <label htmlFor={name} className={`${labelClassName} block text-sm font-medium text-gray-700`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex justify-between items-center gap-4 relative">
        <div
          className={`${className} mt-1 flex justify-between items-center bg-white px-3 focus:outline-none w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm`}
        >
          <input
            type={passwordVisible ? 'text' : 'password'} // Toggle between text and password type
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={handleChange}
            style={style}
            className='focus:outline-none w-full py-2 pr-4'
          />
          {/* Conditionally render the eye icon based on toggleVisibility prop */}
          {toggleVisibility && (
          <div className="cursor-pointer" onClick={togglePasswordVisibility}>
            {passwordVisible ? (
              <FaEyeSlash className="text-gray-500" /> // Show EyeSlash when password is visible
            ) : (
              <FaEye className="text-gray-500" /> // Show Eye when password is hidden
            )}
          </div>
        )}
      </div>
      </div>
      {/* Display error message under the input field */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default PasswordInput;