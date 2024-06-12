import { useState } from 'react';
import { registerUser } from '../api/authAPI';

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
    
    try {
        const data = await registerUser(name, email, password);
        setLoading(false);
        return data;
    } catch (err) {
        setError(err.message);
        setLoading(false);
        return null;
    }
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
