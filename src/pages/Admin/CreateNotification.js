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
            <span className="block text-lg font-bold mr-6">New Schedule Item</span>
            <NotificationForm onSubmit={handleSubmit}/>
        </div>
    )
}

export default NewNotificationPage;