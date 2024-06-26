const fetchAllUsers = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/users/`,
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
  const url = userId
    ? `${process.env.REACT_APP_TEST_BACKEND_URL}/api/users/${userId}`
    : `${process.env.REACT_APP_TEST_BACKEND_URL}/api/users/me`;

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

export { fetchAllUsers, fetchUser };
