import React, { useState, useEffect, useRef } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export interface FileDropboxProps {
  label: string;
  name: string;
  required?: boolean;
  acceptedTypes?: string[]; // Accepted file types like ['image/png', 'application/pdf']
  maxSizeMB?: number; // Maximum file size allowed in MB
  onInputChange?: (name: string, value: File[] | null) => void; // Updated to handle multiple files
  onError?: (name: string, error: string) => void;
  isSubmitted?: boolean; // To trigger validation when the form is submitted
  className?: string; // Custom class for styling
  style?: React.CSSProperties; // Custom inline styles
}

const FileDropbox: React.FC<FileDropboxProps> = ({
  label,
  name,
  required = false,
  acceptedTypes = [],
  maxSizeMB = 5, // Default max size is 5 MB
  onInputChange,
  onError = () => {},
  isSubmitted = false,
  className = "",
  style = {},
}) => {
  const [files, setFiles] = useState<File[]>([]); // Updated to handle multiple files
  const [error, setError] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({}); // Progress tracking for each file
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle validation on form submission and file removal
  useEffect(() => {
    if (isSubmitted) {
      if (required && files.length === 0) {
        setError(`${label} is required.`);
        onError(name, `${label} is required.`);
        onInputChange?.(name, null); // Ensure no file data is submitted if the validation fails
      } else {
        setError('');
        onError(name, '');
      }
    }
  }, [isSubmitted, required, files, label, name, onError, onInputChange]);

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  // Handle file selection via input click
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
    handleFiles(selectedFiles);
    e.target.value = ''; // Reset input to allow re-uploading the same file
  };

  // Handle file selection validation and upload simulation
  const handleFiles = (selectedFiles: File[]) => {
    const validFiles: File[] = [];
    const errors: string[] = [];

    selectedFiles.forEach((file) => {
      // Check file type
      if (acceptedTypes.length && !acceptedTypes.includes(file.type)) {
        errors.push(`Invalid file type: ${file.name}. Accepted types: ${acceptedTypes.join(', ')}`);
      }
      // Check file size
      if (maxSizeMB && file.size / 1024 / 1024 > maxSizeMB) {
        errors.push(`File size exceeds ${maxSizeMB} MB: ${file.name}`);
      }

      if (!errors.length) {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setError(errors.join(', '));
      onError(name, errors.join(', '));
    } else {
      setError('');
      const updatedFiles = [...files, ...validFiles];
      setFiles(updatedFiles);
      onInputChange?.(name, updatedFiles);

      // Simulate file upload
      validFiles.forEach((file) => {
        simulateUpload(file);
      });
    }
  };

  const simulateUpload = (file: File) => {
    setUploadProgress((prev) => ({ ...prev, [file.name]: 0 }));
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress((prev) => ({ ...prev, [file.name]: progress }));

      if (progress >= 100) {
        clearInterval(interval);
      }
    }, 100);
  };

  // Handle file removal
  const handleRemoveFile = (fileToRemove: File) => {
    const updatedFiles = files.filter((file) => file !== fileToRemove);
    setFiles(updatedFiles);
    setUploadProgress((prev) => {
      const updated = { ...prev };
      delete updated[fileToRemove.name];
      return updated;
    });
    onInputChange?.(name, updatedFiles.length ? updatedFiles : null); // Ensure form knows there's no file if all are removed

    // If no files are left after removal and the field is required, trigger an error
    if (updatedFiles.length === 0 && required) {
      setError(`${label} is required.`);
      onError(name, `${label} is required.`);
    } else {
      setError('');
      onError(name, '');
    }
  };

  // Truncate long file names for display
  const truncateFileName = (name: string, maxLength: number) => {
    return name.length > maxLength ? `${name.slice(0, maxLength)}...` : name;
  };

  // Handle drag events for visual feedback
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className={`${className} mb-4`} style={style}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div
        className={`border-dashed border-2 rounded-lg px-4 py-12 bg-blue-200 bg-opacity-30 mt-1 cursor-pointer ${
          isDragging ? 'border-indigo-500' : 'border-gray-300'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClickUpload}
      >
        <div className="text-center">
          <p>Drag and drop your files here or click to select</p>
          <input
            type="file"
            accept={acceptedTypes.join(',')}
            onChange={handleFileInputChange}
            ref={fileInputRef}
            className="hidden"
            multiple
          />
        </div>
      </div>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="mt-2">
        {files.map((file) => (
          <div
            key={file.name}
            className="flex items-center justify-between mt-2 p-2 border border-gray-300 rounded shadow-sm"
          >
            {uploadProgress[file.name] < 100 ? (
              <div className="flex flex-col">
                <span>
                  <span className="text-blue-400">Uploading</span>{' '}
                  {truncateFileName(file.name, 56)}
                </span>
                <div className="ml-2 w-full bg-gray-200 h-2 rounded pt-2 pb-4">
                  <div
                    className="bg-green-500 h-2 rounded"
                    style={{ width: `${uploadProgress[file.name]}%` }} // Track progress for each file
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-500 mr-2 w-4 h-4" />
                  <span className="text-sm">{truncateFileName(file.name, 64)}</span>
                </div>
                <FaTimesCircle
                  className="text-red-500 ml-2 w-4 h-4 cursor-pointer"
                  onClick={() => handleRemoveFile(file)}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileDropbox;