import { useState, useEffect } from "react";
import { fetchUser } from "../api/userAPI";
import { getCacheUser, setCacheUser } from "../utils/cache";

const useUserData = (id) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("loading user data");
    const fetchData = async () => {
      setLoading(true);
      try {
        const cachedUser = getCacheUser(id);
        if (cachedUser) {
          console.log("pulling from cached user data");
          setUser(cachedUser);
        } else {
          console.log("fetching user data");
          console.log(id);
          const userData = await fetchUser(id);
          console.log("cacheing user data");
          setCacheUser(id, userData);
          setUser(userData);
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { user, loading, error };
};

export default useUserData;
