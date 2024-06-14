import { useState, useEffect } from "react";
import { setCacheUser } from "../utils/cache";
import { fetchAllUsers } from "../api/userAPI";

const useAllUserData = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const data = await fetchAllUsers();
        setUsers(data);
        data.forEach((user) => setCacheUser(user._id, user));
        console.log("Users fetched and cached.");
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return { users, loading, error };
}

export default useAllUserData;