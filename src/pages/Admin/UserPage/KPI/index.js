import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import EditingList from "../../../../components/EditingList";
import { getUserKPI } from "../../../../api/kpiAPI";
import { fetchUser } from "../../../../api/userAPI";

const AdminUserKPIPage = () => {
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

                const attendanceData = await getUserKPI(token, id);
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
    };

    const handleEdit = (item) => {
        console.log(`Tried to edit item: ${item._id}`);
    };

    const handleDelete = (item) => {
        console.log(`Tried to delete item: ${item._id}`);
 
    }

    if (loading) pageContent = <p>Loading...</p>;
    else if (error) { 
        title = <h1>Error</h1>;
        pageContent = <p>{error}</p>;
        backLink = <p><Link to='/admin'>Back to dashboard</Link></p>;
    }
    else { 
        title = <h1>KPI Record for {user.name}</h1>;
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

export default AdminUserKPIPage;