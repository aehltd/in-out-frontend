import React, { useState, useEffect } from "react";
import { convertLocalToUTC } from "../utils/dateFormatting";
import { formatFieldValue, getDefaultFieldValue } from "../utils/fieldFormatting";

const Modal = ({
  isOpen,
  type,
  initialData,
  fields,
  onCancel,
  onSubmit,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleInputChange = (e) => {
    const { name, value, type: inputType, checked } = e.target;
    const newValue = 
      inputType === "datetime-local" || inputType === "date" ? convertLocalToUTC(value)
      : inputType === "checkbox" ? checked
      : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = (e) => {
    if (type === "delete") {
        onSubmit(initialData);
    }
    else { 
        onSubmit(formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {type === "delete" ? (
          <div>
            <p>Are you sure you want to delete this item?</p>
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleSubmit}>Delete</button>
          </div>
        ) : (
          <div>
            {type === "add" && <p>Add new item</p>}
            {type === "edit" && <p>Edit item</p>}
            {Object.keys(fields).map((field) => (
              <div key={field}>
                <label>{field}</label>
                {fields[field] === "checkbox" ? (
                  <input
                    type="checkbox"
                    name={field}
                    checked={formData[field] || false}
                    onChange={handleInputChange}
                  />
                ) : (
                  <input
                    type={fields[field]}
                    name={field}
                    value={formData[field] ? formatFieldValue(fields[field], formData[field]) : getDefaultFieldValue(fields[field])}
                    onChange={handleInputChange}
                  />
                )}
              </div>
            ))}
            <button onClick={onCancel}>Cancel</button>
            <button onClick={handleSubmit}>
              {type === "add" ? "Add" : "Save"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
