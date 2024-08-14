import { useState } from "react";
import { resetPassword } from "../api/authAPI";

const usePasswordReset = () => {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Check for valid email
    if (email === "" || !emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    console.log(email);

    try {
      await resetPassword(email);
      setSubmitted(true);
    } catch (error) {
      console.log(error.msg);
      setError(error.msg);
    }
  };

  return {
    submitted,
    email,
    error,
    handleEmailChange,
    handleSubmit,
  };
};

export default usePasswordReset;
