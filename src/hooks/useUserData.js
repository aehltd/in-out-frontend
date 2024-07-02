import { useState, useEffect, useRef } from "react";
import { fetchUser } from "../api/userAPI";
import { getCacheUser, setCacheUser } from "../utils/cache";
import { updateUser } from "../api/userAPI";

const useUserData = (id = null) => {
  const [user, setUser] = useState(null);
  const initialStateRef = useRef(); // used to store initial state
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
        let userData;
        console.log(id);
        if (id) {
          const cachedUser = getCacheUser(id);
          if (cachedUser) {
            console.log("pulling from cached user data");
            userData = cachedUser;
          } else {
            console.log("fetching user data by ID from API");
            userData = await fetchUser(id);
            console.log("cacheing user data");
            setCacheUser(id, userData);
          }
        } else {
          console.log("Fetching current user's data from API...");
          userData = await fetchUser();
        }

        if (JSON.stringify(user) !== JSON.stringify(userData)) {
          console.log("Setting user data from fetched data");
          setUser(userData);
          initialStateRef.current = { ...userData };
        } else {
          console.log("User data is the same, did not change.");
        }
      } catch (err) {
        setError(err.message);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user) {
      console.log("user data changed");
      console.log("User data:", user);
      if (JSON.stringify(user) === JSON.stringify(initialStateRef.current)) {
        console.log("user data is the same as initial state");
        setIsBeingEdited(false);
      }
    } else {
      console.log("initializing user ");
    }
  }, [user]);

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
    console.log("Resetting...");
    setUser(initialStateRef.current);
    setIsDisabled({ name: true, role: true, email: true });
  };

  const handleSubmit = async () => {
    console.log("Submitting...");
    console.log(user);
    initialStateRef.current = { ...user };
    setIsBeingEdited(false);
    setIsDisabled({ name: true, role: true, email: true });

    if (!id) {
      if (user.name !== localStorage.getItem("name")) {
        localStorage.setItem("name", user.name);
      }
      if (user.role && user.role !== localStorage.getItem("role")) {
        localStorage.setItem("role", user.role);
      }
    }

    const updatedUser = await updateUser(id, user);
    console.log("Updated user:", updatedUser);
    setCacheUser(id, updatedUser);
  };

  return {
    user,
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
