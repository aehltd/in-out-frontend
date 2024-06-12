import React from "react";

const EditingList = ({ list, fields, onAdd, onEdit, onDelete }) => {
  return (
    <div>
      <h2>Editing List</h2>

      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {fields.map((field) => (
              <span key={field}>{item[field]} </span>
            ))}
            <button onClick={() => onEdit(item)}>Edit</button>
            <button onClick={() => onDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={onAdd}>Add</button>
    </div>
  );
};

export default EditingList;
