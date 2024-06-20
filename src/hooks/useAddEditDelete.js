import { useState } from 'react';

const useAddEditDelete = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // [item]
  const [modalType, setModalType] = useState(null); // ['add', 'edit', 'delete']
  const [modalFunction, setModalFunction] = useState(null); // [onAdd, onEdit, onDelete]

  const openModalWithType = (type, item, modalFunction) => {
    setModalType(type);
    setSelectedItem(item);
    setModalFunction(modalFunction);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    selectedItem,
    modalType,
    modalFunction,
    openModalWithType,
    handleCloseModal,
  };
};

export default useAddEditDelete;