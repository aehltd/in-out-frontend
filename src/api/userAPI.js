const fetchAllUsers = async (token) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/users/`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
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

const fetchUser = async (token, userId) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_TEST_BACKEND_URL}/api/users/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": token,
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

export { fetchAllUsers, fetchUser };
