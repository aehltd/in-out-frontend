import React from "react";

const Modal = ({ children, isOpen, size }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 top flex items-center justify-center bg-black bg-opacity-50">
      <div className={`container max-w-${size}`}>{children}</div>
    </div>
  );
};

export default Modal;
