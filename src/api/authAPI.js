const loginUser = async (email, password) => {
  console.log(`${process.env.REACT_APP_BACKEND_URL}`)
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }

    return data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw new Error(error.message);
  }
};

const registerUser = async (name, email, password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      throw new Error("Failed to register.");
    }
    return data;
  } catch (error) {
    console.error("Registration failed:", error.message);
    throw new Error("Failed to register. Please try again later.");
  }
};

const confirmCurrentPassword = async (password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/confirm-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to confirm password:", error.message);
    throw new Error(error.message);
  }
};

const changePassword = async (password) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/change-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ password }),
      }
    );
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  } catch (error) {
    console.error("Failed to change password:", error.message);
    throw new Error(error.message);
  }
};

const resetPassword = async (email) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/auth/reset-password`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    )
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg);
    }
    return data;
  }
  catch (error) {
    console.error("Failed to reset password: ", error.message);
    throw new Error(error.message);
  }
};

export { loginUser, registerUser, confirmCurrentPassword, changePassword, resetPassword };
