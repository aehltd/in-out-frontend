import React, { useState } from 'react';

const CheckboxDropdown = ({ users, selectedRecipients, setSelectedRecipients }) => {
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
    <div className="checkbox-dropdown">
      <button type="button" onClick={toggleDropdown}>
        {isOpen ? 'Close' : 'Open'} Recipients
      </button>
      {isOpen && (
        <div className="dropdown-content">
          <label>
            <input
              type="checkbox"
              checked={selectedRecipients.length === users.length}
              onChange={handleSelectAllChange}
            />
            Select All
          </label>
          {users.map((user) => (
            <label key={user._id}>
              <input
                type="checkbox"
                value={user._id}
                checked={selectedRecipients.includes(user._id)}
                onChange={() => handleCheckboxChange(user._id)}
              />
              {user.name}
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckboxDropdown;