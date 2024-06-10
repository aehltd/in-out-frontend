import { useState } from "react";

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
        const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        setLoading(false);

        if (!response.ok) {
            throw new error('Failed to login.')
        }

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
