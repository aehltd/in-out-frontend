import { useState, useEffect } from "react";
import { fetchUser } from "../api/userAPI";
import { getCacheUser, setCacheUser } from "../utils/cache";

const useUserData = (id = null) => {
  const [user, setUser] = useState(null);
  const [initialState, setInitialState] = useState({});
  const [isBeingEdited, setIsBeingEdited] = useState(false);
  const [isDisabled, setIsDisabled] = useState({
    name: true,
    role: true,
    email: true,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("loading user data");
    const fetchData = async () => {
      setLoading(true);
      try {
        console.log(id);
        if (id) {
          const cachedUser = getCacheUser(id);
          if (cachedUser) {
            console.log("pulling from cached user data");
            setUser(cachedUser);
          } else {
            console.log("fetching user data by ID from API");
            console.log(id);
            const userData = await fetchUser(id);
            console.log("cacheing user data");
            setCacheUser(id, userData);
            setUser(userData);
          }
        } else {
          console.log("Fetching current user's data from API...");
          const userData = await fetchUser();
          setUser(userData);
          setInitialState({ ...userData });
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

  useEffect(() => {
    console.log("user data changed");
    console.log("User data:", user);
    console.log("Initial state:", initialState);
    if (JSON.stringify(user) === JSON.stringify(initialState)) {
      console.log("user data is the same as initial state");
      setIsBeingEdited(false);
    }
  }, [user, initialState]);

  useEffect(() => {
    console.log("disabled changed");
    console.log(isDisabled);
  }, [isDisabled]);

  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    setIsBeingEdited(true);
    setUser({ ...user, [e.target.id]: e.target.value });
  };

  const handleEnable = (e) => {
    console.log(e.target.id);
    setIsDisabled({ ...isDisabled, [e.target.id]: false });
  };

  const handleReset = () => {
    setUser(initialState);
    setIsDisabled({ name: true, role: true, email: true });
    console.log("Reset");
  };

  const handleSubmit = () => {
    setInitialState({
      ...initialState,
      name: user.name,
      role: user.role,
      email: user.email,
    });
    setIsDisabled({ name: true, role: true, email: true });
    console.log("Saved");
  };

  return {
    user,
    initialState,
    isBeingEdited,
    isDisabled,
    loading,
    error,
    handleChange,
    handleEnable,
    handleReset,
    handleSubmit,
  };
};

export default useUserData;
