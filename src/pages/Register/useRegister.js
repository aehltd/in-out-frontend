import { useState } from 'react';

const useRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
    }
    
    const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.msg);
    }

    return data;
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    loading,
    error,
    handleNameChange,
    handleEmailChange,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSubmit,
  };
};

export default useRegister;
