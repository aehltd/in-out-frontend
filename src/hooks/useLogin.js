import { useState } from "react";
import { loginUser } from "../api/authAPI";

const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email === "" || password === "") {
      setError("Both fields are required.");
      setLoading(false);
      return;
    }

    try {
      const data = await loginUser(email, password);
      setLoading(false);
      return data;
    } catch (error) {
      console.error("Login failed:", error.message);
      setError("Failed to login. Please try again later.");
      setLoading(false);
      return null; // Return null or handle error as needed
    }
  };

  return {
    email,
    password,
    loading,
    error,
    handleEmailChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useLogin;
