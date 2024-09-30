import React, { useState, ReactElement, useCallback } from "react";
import SuccessPopup from "./SuccessPopup";

export interface FormProps {
    onSubmit: (data: Record<string, any>) => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

const FormWrap: React.FC<FormProps> = ({
    onSubmit,
    children,
    className = "",
    style = {},
}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const handleInputChange = useCallback((name: string, value: any) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleError = useCallback((name: string, error: string) => {
        setErrors((prev) => ({ ...prev, [name]: error }));
    }, []);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitted(true);

        const newErrors: Record<string, string> = {};

        React.Children.forEach(children, (child) => {
            if (React.isValidElement(child) && child.props.required) {
                const { name, label } = child.props;
                const value = formData[name];

                // Only check for required fields; pattern validation is handled within the components
                if (!value || value === "") {
                    newErrors[name] = `${label || name} is required`;
                }
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const filteredErrors = Object.values(errors).filter(
            (error) => error.trim() !== ""
        );

        if (filteredErrors.length > 0) {
            return;
        }

        // If no errors, proceed with form submission
        setIsSubmitted(false);
        setShowSuccessPopup(true);
        onSubmit(formData);
    };

    const handleClosePopup = () => {
        setShowSuccessPopup(false);
      };

    return (
        <>
        <form
            onSubmit={handleFormSubmit}
            className={`${className} mx-auto px-8 py-12 border w-2/5 border-gray-300 rounded-md shadow-md space-y-4`}
            style={style}
        >
            {React.Children.map(children, (child) => {
                if (React.isValidElement(child) && child.props.name) {
                    return React.cloneElement(child as ReactElement<any>, {
                        onInputChange: handleInputChange,
                        onError: handleError,
                        isSubmitted,
                        formData, // Pass formData to the child
                    });
                }
                return child;
            })}
        </form>
        {showSuccessPopup && (
            <SuccessPopup message="Form submitted successfully!" onClose={handleClosePopup} />
          )}
        </>
    );
};

export default FormWrap;