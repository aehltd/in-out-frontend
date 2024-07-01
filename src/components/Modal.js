import React from "react";

const Modal = ({ children, isOpen, size }) => {
  const sizeClasses = {
    xs: "max-w-xs",
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 top flex items-center justify-center bg-black bg-opacity-50">
      <div className={`container ${sizeClasses[size] || sizeClasses.md}`}>{children}</div>
    </div>
  );
};

export default Modal;
