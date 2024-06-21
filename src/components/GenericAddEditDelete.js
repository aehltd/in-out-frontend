import React, { useState, useEffect } from "react";
import { convertLocalToUTC } from "../utils/dateFormatting";
import {
  formatFieldValue,
  getDefaultFieldValue,
  getFieldNames
} from "../utils/fieldFormatting";

//Generic modal content for add/edit/delete operations on an editing list
const GenericAddEditDelete = ({ type, fields, onCancel, onSubmit, initialData = null }) => {
  const [formData, setFormData] = useState(initialData || {});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
    console.log("initialData", initialData);
  }, [initialData]);

  useEffect(() => {
    console.log("formData updated", formData);
  }, [formData])

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
    e.preventDefault();
    onSubmit(type, formData);
  };

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

  return (
    <form>
      <span className="block text-lg font-bold mr-6">{content[type]}</span>
        {type !== "delete" ? (
          Object.keys(fields).map((field) => (
            <div className="flex space-x-6 justify-between items-baseline mt-4" key={field}>
              <label>{getFieldNames(field)}</label>
              {fields[field] === "checkbox" ? (
                <input
                  className="input-field h-4 w-4 rounded-lg"
                  type={fields[field]}
                  name={field}
                  checked={formData[field] || false}
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
        <div className="flex justify-end space-x-4 mt-6">
          <button className="btn btn-secondary" onClick={onCancel}>Cancel</button>
          <button className="btn" type="submit" onClick={handleSubmit}>                
            {button[type]}
          </button>
        </div>
    </form>
  );
};

export default GenericAddEditDelete;
