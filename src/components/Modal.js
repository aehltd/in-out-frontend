import React, { useState, useEffect } from "react";
import { convertLocalToUTC } from "../utils/dateFormatting";
import {
  formatFieldValue,
  getDefaultFieldValue,
  getFieldNames
} from "../utils/fieldFormatting";

const Modal = ({ isOpen, type, initialData, fields, onCancel, onSubmit }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const newValue =
      inputType === "datetime-local" || inputType === "date"
        ? convertLocalToUTC(value)
        : inputType === "checkbox"
        ? checked
        : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    if (type === "delete") {
      onSubmit(initialData);
    } else {
      onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  const content = {
    add: "Add New Item",
    edit: "Edit Item",
    delete: "Delete Item",
  }

  const button = {
    add: "Add",
    edit: "Save",
    delete: "Delete",
  }

  const title = content[type];
  const buttonText = button[type];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm">
        <span className="block text-lg font-bold mr-6">{title}</span>
        {type !== "delete" ? (
          Object.keys(fields).map((field) => (
            <div className="flex space-x-6 justify-between items-baseline mt-4" key={field}>
              <label>{getFieldNames(field)}</label>
              {fields[field] === "checkbox" ? (
                <input
                  className="input-field h-4 w-4 rounded-lg"
                  type={fields[field]}
                  name={field}
                  value={formData[field] || false}
                  onChange={handleInputChange}
                />
              ) : (
                <input
                  className="input-field"
                  type={fields[field]}
                  name={field}
                  value={
                    formData[field]
                      ? formatFieldValue(fields[field], formData[field])
                      : getDefaultFieldValue(fields[field])
                  }
                  onChange={handleInputChange}
                />
              )}
            </div>
          ))
        ) : (
          <div className="mt-6">Are you sure you want to delete this item?</div>
        )}
        <div className="flex justify-between mt-6">
          <button className="btn" onClick={onCancel}>Cancel</button>
          <button className="btn" onClick={handleSubmit}>                
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
