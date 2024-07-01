import { useState } from "react";
import { getDefaultFieldValue } from "../utils/fieldFormatting";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null); // [item]
  const [modalType, setModalType] = useState(null); // ['add', 'edit', 'delete']

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const openModalWithType = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const createDefaultItem = (fields, date = null) => {
    const newItem = {};
    Object.keys(fields).forEach((field) => {
      newItem[field] = getDefaultFieldValue(fields[field], date);
      console.log(`field: ${field}, value: ${newItem[field]}`);
    });
    return newItem;
  };
  return {
    openModal,
    selectedItem,
    modalType,
    handleModalOpen,
    openModalWithType,
    handleModalClose,
    createDefaultItem,
  };
};

export default useModal;
