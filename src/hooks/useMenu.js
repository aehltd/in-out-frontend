import { useState } from "react";

const useMenu = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({x: 0, y: 0});
    const [menuOptions, setMenuOptions] = useState({add: "Add"});
    const [selectedItem, setSelectedItem] = useState(null);

    const openMenuWithItem = (record, event) => {
        setSelectedItem(record);
        console.table(record);
        // Check if the record sent has an ID -> Means that it is live on the database
        if (record._id) {
            console.log("Record has an ID")
            setMenuOptions({edit: "Edit", delete: "Delete"});
        } else {
            console.log("Record does not have an ID")
            setMenuOptions({add: "Add"});
        }
        setMenuPosition({x: event.clientX, y: event.clientY});
        setMenuOpen(true);
    }
    
    const handleMenuClose = () => {
        setMenuOpen(false);
    }

    return {
        menuOpen,
        menuPosition,
        menuOptions,
        selectedItem,
        openMenuWithItem,
        handleMenuClose,
    }
}

export default useMenu;