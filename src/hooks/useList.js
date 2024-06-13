import { useEffect, useState, useCallback } from "react";

const useList = (token, id, getListContents) => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadList = useCallback(async () => {
    console.log("loading list from API");
    setLoading(true);
    try {
      const attendanceData = await getListContents(token, id);
      setList(attendanceData);
    } catch (err) {
      setError(err.message);
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [token, id, getListContents]);

  useEffect(() => {
    loadList();
  }, [loadList]);

  return { list, loading, error, loadList };
};

export default useList;
