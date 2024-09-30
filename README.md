# Awesome Input Val

`awesome-input-val` is a customizable form validation package for React. It provides components like `TextInput`, `EmailInput`, `PasswordInput`, `RadioButton`, `FileSelect`, `FileDropBox`, and more with built-in validation.

## Installation

To install:

```bash
npm install awesome-input-val
```

or

```bash
yarn add awesome-input-val
```

## Features

- **TextInput**: For text or number input with validation for length, allowed characters, and custom rules.
- **EmailInput**: Validates email input.
- **PasswordInput**: Toggles password visibility, with validation for password strength.
- **ConfirmPasswordInput**: Ensures that the confirmed password matches the original password.
- **RadioButton**: Supports single or multiple option selection.
- **FileSelect**: For uploading files with validation on file type and size.
- **FileDropBox**: Drag-and-drop file upload with validation for multiple files.
- **FormWrap**: Wraps the form and handles form submission, with automatic data management.

## Usage

### 1. `TextInput`

```tsx
<TextInput
  label="First Name"
  name="firstname"
  type="text"
  placeholder="Enter name"
  required
  minLength={3}
  maxLength={15}
  allowSpecialChars={false}
  allowSpaces={true}
  transformToUppercase={false}
  allowNumbers={true}
  min={1}
  max={100}
  onInputChange={(name, value) => console.log(name, value)}
  onError={(name, error) => console.log(name, error)}
  className="custom-class"
  style={{ color: "red" }}
/>
```

### 2. `RadioButton`

```tsx
<RadioButton
  label="Select Gender"
  name="gender"
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
  ]}
  required
  multiple={false}
  stackOptions="vertical"
  onInputChange={(name, value) => console.log(name, value)}
  onError={(name, error) => console.log(name, error)}
  customColors={{ unchecked: "#fff", checked: "#000" }}
  className="custom-class"
/>
```

### 3. `EmailInput`

```tsx
<EmailInput
  label="Email Address"
  name="email"
  placeholder="Enter your email"
  required
  onInputChange={(name, value) => console.log(name, value)}
  onError={(name, error) => console.log(name, error)}
  className="email-class"
/>
```

### 4. `PasswordInput`

```tsx
<PasswordInput
  label="Password"
  name="password"
  placeholder="Enter password"
  required
  minLength={8}
  toggleVisibility={true}
  onInputChange={(name, value) => console.log(name, value)}
  onError={(name, error) => console.log(name, error)}
  className="password-class"
/>
```

### 5. `ConfirmPasswordInput`

```tsx
<ConfirmPasswordInput
  label="Confirm Password"
  name="confirmPassword"
  formData={{ password: 'test' }}
  required
  onInputChange={(name, value) => console.log(name, value)}
  onError={(name, error) => console.log(name, error)}
  className="confirm-password-class"
/>
```

### 6. `FileSelect`

```tsx
<FileSelect
  label="Upload Document"
  name="document"
  required
  acceptedTypes={["application/pdf"]}
  maxSizeMB={5}
  onInputChange={(name, files) => console.log(name, files)}
  onError={(name, error) => console.log(name, error)}
  className="file-select-class"
/>
```

### 7. `FileDropBox`

```tsx
<FileDropBox
  label="Upload Documents"
  name="documents"
  required
  acceptedTypes={["image/png", "image/jpeg"]}
  maxSizeMB={10}
  onInputChange={(name, files) => console.log(name, files)}
  onError={(name, error) => console.log(name, error)}
  className="file-dropbox-class"
/>
```

### 8. `FormWrap`

```tsx
<FormWrap
  onSubmit={(data) => console.log(data)}
  className="form-wrap-class"
>
  {children}
</FormWrap>
```

### 9. `SuccessPopup`

```tsx
<SuccessPopup
  message="Form submitted successfully!"
  onClose={() => console.log("Popup closed")}
/>
```

## Sample

Below is an example of how to use all the components in a form:

```tsx
import {
  ConfirmPasswordInput,
  EmailInput,
  FormWrap,
  PasswordInput,
  TextInput,
  RadioButton,
  FileSelect,
  FileDropBox,
} from "awesome-input-val";

function App() {
  const handleSubmit = (data: Record<string, any>) => {
    console.log("Form Submitted!", data);
  };

  return (
    <div className="min-h-screen bg-gray-200 py-20 flex flex-col items-center justify-center">
      <FormWrap onSubmit={handleSubmit}>
        <TextInput
          label="First Name"
          name="firstname"
          className="pt-24 bg-red-400"
          placeholder="First Name"
          required
        />
        <EmailInput
          label="Enter your email"
          name="email"
          placeholder="Email"
          required
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Enter your password"
          required
        />
        <ConfirmPasswordInput
          label="Confirm Password"
          name="confirmPassword"
          formData={{ password: "" }}
        />
        <RadioButton
          label="Select your favorite fruit"
          name="favoriteFruit"
          options={[
            { value: "apple", label: "Apple" },
            { value: "banana", label: "Banana" },
            { value: "orange", label: "Orange" },
          ]}
          required
        />
        <RadioButton
          label="Select your hobbies"
          name="hobbies"
          multiple
          options={[
            { value: "reading", label: "Reading" },
            { value: "swimming", label: "Swimming" },
            { value: "traveling", label: "Traveling" },
          ]}
          required
        />
        <FileSelect
          label="Upload Your Document"
          name="document"
          required
          acceptedTypes={["application/pdf", "application/msword"]}
          maxSizeMB={5}
        />
        <FileDropBox
          label="Upload Your Documents"
          name="documents"
          required
          acceptedTypes={["application/pdf", "image/png", "image/jpeg"]}
          maxSizeMB={10}
        />
        <button
          type="submit"
          className="bg-blue-700 py-2 px-3 rounded-md text-white"
        >
          Submit
        </button>
      </FormWrap>
    </div>
  );
}

export default App;
```

## Author

Created by **Rakesh Panugoth**.

## License

This package is open-sourced under the ISC license.