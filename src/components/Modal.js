import React from 'react';

const Modal = ({children, isOpen, size}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className={`container max-w-${size}`}>
        {children}
      </div>
    </div>
  )
}

export default Modal;