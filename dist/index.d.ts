import React from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';

interface TextInputProps {
    label: string;
    name: string;
    type?: "text" | "number";
    placeholder?: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    allowSpecialChars?: boolean;
    allowSpaces?: boolean;
    transformToUppercase?: boolean;
    allowNumbers?: boolean;
    min?: number;
    max?: number;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
    containerClassName?: string;
    labelClassName?: string;
}
declare const TextInput: React.FC<TextInputProps>;

interface RadioButtonProps {
    label: string;
    name: string;
    options: {
        value: string;
        label: string;
    }[];
    required?: boolean;
    multiple?: boolean;
    onInputChange?: (name: string, value: string | string[]) => void;
    onError?: (name: string, error: string) => void;
    className?: string;
    containerClassName?: string;
    labelClassName?: string;
    style?: React.CSSProperties;
    stackOptions?: 'vertical' | 'horizontal';
    customColors?: {
        unchecked: string;
        checked: string;
    };
}
declare const RadioButton: React.FC<RadioButtonProps>;

interface EmailInputProps {
    label: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
    containerClassName?: string;
    labelClassName?: string;
}
declare const EmailInput: React.FC<EmailInputProps>;

interface FormProps {
    onSubmit: (data: Record<string, any>) => void;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}
declare const FormWrap: React.FC<FormProps>;

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
    toggleVisibility?: boolean;
}
declare function PasswordInput({ label, name, placeholder, required, containerClassName, labelClassName, minLength, onInputChange, onError, isSubmitted, className, style, toggleVisibility, }: PasswordInputProps): react_jsx_runtime.JSX.Element;

interface ConfirmPasswordInputProps {
    label?: string;
    name: string;
    placeholder?: string;
    formData: Record<string, any>;
    containerClassName?: string;
    labelClassName?: string;
    required?: boolean;
    minLength?: number;
    onInputChange?: (name: string, value: string) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
    toggleVisibility?: boolean;
}
declare function ConfirmPasswordInput({ label, name, formData, // Access formData here
placeholder, required, containerClassName, labelClassName, onInputChange, onError, isSubmitted, className, style, toggleVisibility, }: ConfirmPasswordInputProps): react_jsx_runtime.JSX.Element;

interface SuccessPopupProps {
    message: string;
    onClose: () => void;
}
declare const SuccessPopup: React.FC<SuccessPopupProps>;

interface FileInputProps {
    label: string;
    name: string;
    required?: boolean;
    acceptedTypes?: string[];
    maxSizeMB?: number;
    onInputChange?: (name: string, value: File[] | null) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const FileInput: React.FC<FileInputProps>;

interface FileDropboxProps {
    label: string;
    name: string;
    required?: boolean;
    acceptedTypes?: string[];
    maxSizeMB?: number;
    onInputChange?: (name: string, value: File[] | null) => void;
    onError?: (name: string, error: string) => void;
    isSubmitted?: boolean;
    className?: string;
    style?: React.CSSProperties;
}
declare const FileDropbox: React.FC<FileDropboxProps>;

export { ConfirmPasswordInput, EmailInput, FileDropbox as FileDropBox, FileInput as FileSelect, FormWrap, PasswordInput, RadioButton, SuccessPopup, TextInput };
