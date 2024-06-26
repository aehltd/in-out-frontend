import { useState } from "react";
import { addNotification } from "../api/notificationAPI";

const useNotificationForm = () => {
  const [type, setType] = useState("task");
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleRecipientsChange = (updatedRecipients) => {
    setRecipients(updatedRecipients);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const item = {
        date: date,
        title: title,
        description: description,
        recipients: recipients,
      };
      console.log(type, item);

      if (recipients.length === 0) {
        setError("Please select at least one recipient");
        setLoading(false);
        return null;
      }

      const data = await addNotification(type, item);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err.msg);
      setLoading(false);
      return null;
    }
  };

  return {
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
  };
};

export default useNotificationForm;
