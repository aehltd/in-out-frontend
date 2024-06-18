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
                <div className="flex space-x-4 space-between mt-4 items-center">
                    <label>Type:</label>
                    <select className="input-field" value={type} onChange={handleTypeChange}>
                        <option value="task">Task</option>
                        <option value="meeting">Meeting</option>
                    </select>
                </div>
                <div className="flex space-x-4 justify-between mt-4 items-center">
                    <label>Date:</label>
                    <input className="input-field" type="datetime-local" value={date} onChange={handleDateChange} required />
                </div>
                <div className="flex space-x-4 justify-between mt-4 items-center">
                    <label>Title:</label>
                    <input className="input-field" 
                        type="text" value={title} 
                        onChange={handleTitleChange} 
                        placeholder={type === "task" ? "New Task" : "New Meeting"}
                        required/>
                </div >
                <div className="flex space-x-4 justify-between mt-4 items-center">
                    <label>Description:</label>
                    <textarea className="input-field" value={description} 
                    onChange={handleDescriptionChange} 
                    placeholder="Enter description here..."
                    rows={4} required>
                    </textarea>
                </div>
                <div className="flex space-x-4 justify-between mt-4 items-center">
                    <label>Recipients:</label>
                    <CheckboxDropdown
                        users={users}
                        selectedRecipients={recipients}
                        setSelectedRecipients={handleRecipientsChange}
                    />
                </div>
                <div className="mt-6 flex justify-end">
                    <button className="btn" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NotificationForm;