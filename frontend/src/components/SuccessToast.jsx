import React, { useEffect } from 'react';

const SuccessToast = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 3000); // Se cierra en 3 seg
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[100] animate-fade-down animate-duration-500">
      <div className="flex items-center bg-white border-l-4 border-green-500 shadow-md rounded-r-lg px-4 py-3 min-w-[200px]">
        <div className="text-green-500 mr-3">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-sm font-medium text-gray-700">{message}</span>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuccessToast;