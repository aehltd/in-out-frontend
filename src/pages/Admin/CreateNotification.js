import React from "react";
import NotificationForm from "../../components/NotificationForm";
import { useNavigate } from "react-router";

const NewNotificationPage = () => {
    const navigate = useNavigate();
    const handleSubmit = (scheduleItem) => {
        console.log("Hello");
        navigate("/");
    }

    return (
        <div>
            <h1>New Schedule Item</h1>
            <NotificationForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default NewNotificationPage;