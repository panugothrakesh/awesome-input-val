import React, { useState } from "react";

export interface RadioButtonProps {
  label: string;
  name: string;
  options: { value: string; label: string }[]; // Array of options with value and label
  required?: boolean;
  multiple?: boolean; // Toggle between single (radio) or multiple (checkbox)
  onInputChange?: (name: string, value: string | string[]) => void;
  onError?: (name: string, error: string) => void;
  className?: string; // Custom class for the input container
  containerClassName?: string; // Custom class for the entire container
  labelClassName?: string; // Custom class for the label
  style?: React.CSSProperties;
  stackOptions?: 'vertical' | 'horizontal'; // Toggle between vertical and horizontal stacking
  customColors?: { unchecked: string; checked: string }; // Custom colors for checked and unchecked states
}

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  options,
  required,
  multiple = false, // Default is single selection (radio button)
  onInputChange,
  className = "",
  containerClassName = "",
  labelClassName = "",
  stackOptions = 'horizontal', // Default to horizontal stacking
  customColors = { unchecked: 'border-gray-300', checked: 'border-blue-500' }, // Default colors
  style = {},
}) => {
  const [selectedValues, setSelectedValues] = useState<string | string[]>(multiple ? [] : "");

  const handleChange = (value: string) => {
    if (multiple) {
      const currentValues = Array.isArray(selectedValues) ? [...selectedValues] : [];
      if (currentValues.includes(value)) {
        setSelectedValues(currentValues.filter((v) => v !== value)); // Remove value if it's unchecked
      } else {
        setSelectedValues([...currentValues, value]); // Add value if it's checked
      }
      onInputChange?.(name, currentValues.includes(value) ? currentValues.filter((v) => v !== value) : [...currentValues, value]);
    } else {
      setSelectedValues(value);
      onInputChange?.(name, value); // Send the selected value to FormWrap or parent component
    }
  };

  return (
    <div className={`${containerClassName} mb-4`} style={style}>
      {/* Label and container part unaffected by stackOptions */}
      <label className={`${labelClassName} font-semibold`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {/* Only options stack either vertically or horizontally */}
      <div className={`flex ${stackOptions === 'vertical' ? 'flex-col gap-2' : 'flex-row gap-4'} mt-2`}>
        {options.map((option) => (
          <label key={option.value} className={`flex items-center cursor-pointer`}>
            <input
              type={multiple ? 'checkbox' : 'radio'}
              name={name}
              value={option.value}
              checked={multiple ? (selectedValues as string[]).includes(option.value) : selectedValues === option.value}
              onChange={() => handleChange(option.value)}
              className={`${className}`}
            />
            <span
              className={`inline-block w-4 h-4 mr-2 border-2 rounded-full peer-checked:bg-blue-500
                peer-checked:${customColors.checked} border-${customColors.unchecked}`}
            ></span>
            <span className="text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default RadioButton;