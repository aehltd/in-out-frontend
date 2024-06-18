import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import {
  formatFieldValue,
  getDefaultFieldValue,
} from "../utils/fieldFormatting";

const EditingList = ({ list, fields, onAdd, onEdit, onDelete }) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // [item]
  const [modalType, setModalType] = useState(null); // ['add', 'edit', 'delete']
  const [modalFunction, setModalFunction] = useState(null); // [onAdd, onEdit, onDelete]

  useEffect(() => {
    console.log("list loaded");
    console.table(list);
  }, [list]);

  const handleDeleteClick = (item) => {
    setModalType("delete");
    console.log("selected item:");
    console.table(item);
    setSelectedItem(item);
    setModalFunction(() => () => handleConfirmDelete(item));
    setOpenModal(true);
  };
  
  const handleConfirmDelete = (item) => {
    if (item) {
      onDelete(item);
    }
    handleCloseModal();
  };

  const handleAddClick = () => {
    setModalType("add");
    const newItem = {};
    Object.keys(fields).forEach((field) => {
      newItem[field] = getDefaultFieldValue(fields[field]);
      console.log(`field: ${field}, value: ${newItem[field]}`);
    });
    setSelectedItem(newItem);
    setModalFunction(() => handleConfirmAdd);
    setOpenModal(true);
  };
  const handleConfirmAdd = (newItem) => {
    onAdd(newItem);
    handleCloseModal();
  };

  const handleEditClick = (item) => {
    setModalType("edit");
    console.log("selected item:");
    console.table(item);
    setSelectedItem(item);
    setModalFunction(() => handleConfirmEdit);
    setOpenModal(true);
  };
  const handleConfirmEdit = (newItem) => {
    onEdit(newItem);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div>
      <button onClick={handleAddClick}>Add</button>

      <Modal
        isOpen={openModal}
        type={modalType}
        initialData={selectedItem}
        fields={fields}
        onCancel={handleCloseModal}
        onSubmit={modalFunction}
      />

      <ul className="list">
        {list.map((item) => (
        <li className="list-item" key={item._id}>
        <div className="flex justify-between items-center">
          <h3>{item.name}</h3>
          <div className="grow">
            {Object.keys(fields).map((field) => (
              <div key={field}>
                <label>{field}: </label>
                <span>{formatFieldValue(fields[field], item[field])}</span>
              </div>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="btn text-black bg-transparent hover:bg-gray-400 px-2 py-2" onClick={() => handleEditClick(item)}>
              <span className="material-icons-outlined">edit</span>
            </button>
            <button className="btn text-black bg-transparent hover:bg-gray-400 px-2 py-2" onClick={() => handleDeleteClick(item)}>
              <span className="material-icons-outlined">delete</span>
            </button>
         </div>
         </div>
       </li>
        ))}
      </ul>
    </div>
  );
};

export default EditingList;
