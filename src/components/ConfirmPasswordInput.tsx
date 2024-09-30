import React, { useEffect, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useDebounce } from '../hooks/useDebounce';

interface ConfirmPasswordInputProps {
  label?: string;
  name: string;
  placeholder?: string;
  formData: Record<string, any>; // Access formData to get the original password
  containerClassName?: string;
  labelClassName?: string;
  required?: boolean;
  minLength?: number;
  onInputChange?: (name: string, value: string) => void;
  onError?: (name: string, error: string) => void;
  isSubmitted?: boolean;
  className?: string;
  style?: React.CSSProperties;
  toggleVisibility?: boolean; // Control visibility toggle
}

function ConfirmPasswordInput({
  label = "Confirm Password",
  name,
  formData, // Access formData here
  placeholder = `Enter your ${label}`,
  required = false,
  containerClassName = '',
  labelClassName = '',
  onInputChange,
  onError = () => {},
  isSubmitted = false,
  className = "",
  style = {},
  toggleVisibility = true, // Default to true
}: ConfirmPasswordInputProps) {
  const [error, setError] = useState('');
  const [value, setValue] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // Track password visibility
  const debouncedValue = useDebounce(value, 800); // Debounce the input

  // Memoize the original password from formData to prevent unnecessary re-renders
  const originalPassword = formData.password || '';

  // Debounced validation logic (runs after debounce delay)
  useEffect(() => {
    let errorMsg = '';

    if (debouncedValue.trim() === '') {
      // errorMsg = `${label} is required.`;
      errorMsg = ''
    } else if (debouncedValue !== originalPassword) {
      errorMsg = 'Passwords do not match';
    }

    setError(errorMsg);
    onError(name, errorMsg); // Notify parent about the error state
    onInputChange?.(name, debouncedValue); // Send the debounced value to parent
  }, [debouncedValue, name, onInputChange, originalPassword, required, label]);

  // Immediate validation logic when form is submitted
  useEffect(() => {
    if (isSubmitted) {
      let errorMsg = '';

      if (value === '') {
        errorMsg = `${label} is required.`;
      } else if (value !== originalPassword) {
        errorMsg = 'Passwords do not match';
      }
      setError(errorMsg);
      onError(name, errorMsg); // Notify parent about the error state on form submission
    }
  }, [isSubmitted, value, originalPassword, onError, name, label, required]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
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
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}

export default ConfirmPasswordInput;