import React from 'react';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface SuccessPopupProps {
  message: string;
  onClose: () => void;
}

const SuccessPopup: React.FC<SuccessPopupProps> = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-96">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          <FaTimes className="text-xl" />
        </button>
        <div className="flex flex-col items-center">
          <FaCheckCircle className="text-green-500 text-6xl mb-4" />
          <p className="text-lg text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default SuccessPopup;
