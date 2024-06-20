import React from 'react';

const Modal = ({children, isOpen}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
        {children}
      </div>
    </div>
  )
}

export default Modal;