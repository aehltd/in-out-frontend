import { useState, useEffect } from "react";

const useList = (token, id, getListContents) => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("loading list")
        const fetchData = async () => {
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
        };

        fetchData();
    }, [token, id, getListContents]);

    return { list, loading, error };
};

export default useList;