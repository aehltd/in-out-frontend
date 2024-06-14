import React from "react";
import useAllUserData from "../hooks/useAllUserData";
import useNotificationForm from "../hooks/useNotificationForm";
import CheckboxDropdown from "./CheckboxDropdown";

const NotificationForm = ({ onSubmit }) => {
    const { users } = useAllUserData();
    const {
        type,
        date,
        title,
        description,
        recipients,
        loading,
        error,
        handleTypeChange,
        handleDateChange,
        handleTitleChange,
        handleDescriptionChange,
        handleRecipientsChange,
        handleSubmit,
    } = useNotificationForm();

    const onItemSubmit = async (e) => {
        const data = await handleSubmit(e);
        console.table(data);
        if (data) {
            onSubmit(data);
        }
    }

    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            <form onSubmit={onItemSubmit}>
                <div>
                    <label>Type:</label>
                    <select value={type} onChange={handleTypeChange}>
                        <option value="task">Task</option>
                        <option value="meeting">Meeting</option>
                    </select>
                </div>
                <div>
                    <label>Date:</label>
                    <input type="datetime-local" value={date} onChange={handleDateChange} required />
                </div>
                <div>
                    <label>Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} required/>
                </div>
                <div>
                    <label>Description:</label>
                    <textarea value={description} onChange={handleDescriptionChange} rows={4} required></textarea>
                </div>
                <CheckboxDropdown
                    users={users}
                    selectedRecipients={recipients}
                    setSelectedRecipients={handleRecipientsChange}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default NotificationForm;