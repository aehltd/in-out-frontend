const fetchAllUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/api/users/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": localStorage.getItem("token"),
        },
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchUser = async (userId = null) => {
  console.log("UserID:", userId)
  console.log("Token:", localStorage.getItem("token"));

  const url = userId
    ? `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
    : `${process.env.REACT_APP_BACKEND_URL}/api/users/me`;

  console.log("URL:", url)

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async (userId = null, updatedUser) => {
  console.log("UserID:", userId)
  console.log("Token:", localStorage.getItem("token"));

  const { name, email, role } = updatedUser;
  const url = userId
    ? `${process.env.REACT_APP_BACKEND_URL}/api/users/update/${userId}`
    : `${process.env.REACT_APP_BACKEND_URL}/api/users/update/me`;

  console.log("URL:", url)
  console.log("Updated User:", updatedUser)
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        email,
        role,
      }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.msg);
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export { fetchAllUsers, fetchUser, updateUser };
