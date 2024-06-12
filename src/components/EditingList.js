import React, { useState } from "react";
import Modal from "./Modal";

const EditingList = ({ list, fields, onAdd, onEdit, onDelete }) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);

    const handleDeleteClick = (item) => {
        setModalContent(
            <div>
                <p>Are you sure you want to delete this item?</p>

                <button onClick={handleCloseModal}>Cancel</button>
                <button onClick={() => handleConfirmDelete(item)}>Delete</button>
            </div>
        )
        setOpenModal(true);
    }
    const handleConfirmDelete = (item) => {
        if (item) {
            onDelete(item);
        }
        handleCloseModal();
    }

    const handleAddClick = () => { 
        setModalContent(
            <div>
                <p>Add new item</p>
                <button onClick={handleCloseModal}>Cancel</button>
                <button onClick={() => handleConfirmAdd()}>Add</button>
            </div>
        )
        setOpenModal(true);
    }
    const handleConfirmAdd = () => {
        onAdd();
        handleCloseModal();
    }

    const handleEditClick = (item) => {
        setModalContent(
            <div>
                <p>Edit item</p>
                {fields.map((field) => (
                    <div key={field}>
                        <label>{field}</label>
                        <input type="text" name={field} />
                    </div>
                ))}

                <button onClick={handleCloseModal}>Cancel</button>
                <button onClick={() => handleConfirmEdit(item)}>Add</button>
            </div>
        )
        setOpenModal(true);
    }
    const handleConfirmEdit = (item) => {
        onEdit(item);
        handleCloseModal();
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setModalContent(null);
    }
    return (
    <div>
      <h2>Editing List</h2>
      <ul>
        {list.map((item) => (
          <li key={item._id}>
            {fields.map((field) => (
              <span key={field}>{item[field]} </span>
            ))}
            <button onClick={() => handleEditClick(item)}>Edit</button>
            <button onClick={() => handleDeleteClick(item)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddClick}>Add</button>

      <Modal isOpen={openModal} children={modalContent} />
    </div>
  );
};

export default EditingList;
