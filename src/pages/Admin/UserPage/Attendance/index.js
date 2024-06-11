import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditingList from "../../../../components/EditingList";
import { getUserAttendance } from "../../../../api/attendanceAPI";
import { fetchUser } from "../../../../api/userAPI";

const AdminUserAttendancePage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let title;
    let pageContent;
    let backLink;

    // Validators
    useEffect(() => {if (!token) navigate('/login')}, [token, navigate]);
    useEffect(() => {if (role !== 'admin') navigate('/access-denied');}, [role, navigate]);

    // get User from ID
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userData = await fetchUser(token, id);
                setUser(userData);

                const attendanceData = await getUserAttendance(token, id);
                setList(attendanceData);
            } catch (err) {
                setError(err.message);
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [token, id]);

    //handle adding a new attendance
    const handleAdd = () => {
        console.log("Tried to add new item.");
    // async (date, isClockedIn) => {
        // try {
        //     //Send the new attendance to the API
        //     const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/add`, {
        //         method: "POST",
        //         headers: {
        //             "Content-Type": "application/json",
        //             "x-auth-token": localStorage.getItem("token"),
        //         },
        //         body: JSON.stringify({
        //             user: user._id,
        //             date: date,
        //             isClockedIn: isClockedIn
        //         }),
        //     });
        //     const data = await response.json();
        //     if (!response.ok) throw new Error(data.msg);
        //     setList([...list, data]); //add the new attendance to the list
        // } catch {
        //     setError(error);
        // } finally {
        //     setLoading(false);
        // }
    };

    const handleEdit = (item) => {
        console.log(`Tried to edit item: ${item._id}`);
    // async (recordID, newDate, newClockedIn) => {
    //     try {
    //         //send the updated record to the API
    //         const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/edit`, {
    //             method: "PUT",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "x-auth-token": localStorage.getItem("token"),
    //             },
    //             body: JSON.stringify(
    //                 {
    //                     _id: recordID,
    //                     date: newDate,
    //                     isClockedIn: newClockedIn
    //                 }
    //             ), 
    //         });
    //         const data = await response.json();
    //         if (!response.ok) throw new Error(data.msg);
    //         setList(list.map((record) => (record._id === recordID ? data : record))); //update the list with the updated record
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    };

    const handleDelete = (item) => {
        console.log(`Tried to delete item: ${item._id}`);
    // async (recordID) => {
    //     try {
    //         //send the record to be deleted to the API
    //         const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/attendance/delete`, {
    //             method: "DELETE",
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 "x-auth-token": localStorage.getItem("token"),
    //             },
    //             body: JSON.stringify({
    //                 _id: recordID
    //             })
    //         });
    //         const data = await response.json();
    //         if (!response.ok) throw new Error(data.msg);
    //         setList(list.filter((record) => record._id !== recordID)); //remove the record from the list
    //     } catch (error) {
    //         setError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    }

    if (loading) pageContent = <p>Loading...</p>;
    else if (error) { 
        title = <h1>Error</h1>;
        pageContent = <p>{error}</p>;
        backLink = <p><Link to='/admin'>Back to dashboard</Link></p>;
    }
    else { 
        title = <h1>Attendance Record for {user.name}</h1>;
        pageContent = <EditingList 
            list={list} 
            fields={['date', 'isClockedIn']} 
            onAdd={handleAdd}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />;    
        backLink = <p><Link to={`/admin/users/${user._id}`}>Back to user</Link></p>;;
    }

    return (
        <div>
            {title}
            {pageContent}
            {backLink}
        </div>
    )
}

export default AdminUserAttendancePage;