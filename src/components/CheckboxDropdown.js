import React, { useState } from "react";

const CheckboxDropdown = ({
  users,
  selectedRecipients,
  setSelectedRecipients,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCheckboxChange = (userId) => {
    const updatedRecipients = selectedRecipients.includes(userId)
      ? selectedRecipients.filter((id) => id !== userId)
      : [...selectedRecipients, userId];

    setSelectedRecipients(updatedRecipients);
  };

  const handleSelectAllChange = () => {
    if (selectedRecipients.length === users.length) {
      setSelectedRecipients([]);
    } else {
      const allUserIds = users.map((user) => user._id);
      setSelectedRecipients(allUserIds);
    }
  };

  return (
    <div>
      <button
        className="flex justify-between align-center w-44 text-gray-700 bg-white hover:bg-gray-100 px-2 py-2 items-center
        border border-gray-400 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-1"
        type="button"
        onClick={toggleDropdown}
      >
        {selectedRecipients.length} selected
        <span className="material-icons-outlined">
          {isOpen ? "arrow_drop_up" : "arrow_drop_down"}
        </span>
      </button>
      {isOpen && (
        <ul className="absolute bg-white border border-gray-300 rounded-md shadow-lg max-h-32 overflow-y-auto focus:outline-none">
          <li className="flex items-center p-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
                checked={selectedRecipients.length === users.length}
                onChange={handleSelectAllChange}
              />
              <span className="ml-2">Select All</span>
            </label>
          </li>
          {users.map((user) => (
            <li key={user._id} className="flex items-center p-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600 border-gray-300 rounded"
                  value={user._id}
                  checked={selectedRecipients.includes(user._id)}
                  onChange={() => handleCheckboxChange(user._id)}
                />
                <span className="ml-2">{user.name}</span>
              </label>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CheckboxDropdown;
