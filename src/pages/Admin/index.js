import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/UserList';

const AdminPage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    // States for user list
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let listContent;

    //Validators
    useEffect(() => {if (!token) navigate('/login')}, [token, navigate]);
    useEffect(() => {if (role !== 'admin') navigate('/access-denied');}, [role, navigate]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_TEST_BACKEND_URL}/api/auth/all`, {
                    method: "GET",
                    headers: {
                      "Content-Type": "application/json",
                      "x-auth-token": localStorage.getItem("token"),
                    },
                  });
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // Handlers

    // Handle user click
    const handleUserClick = (user) => {
        //navigate(`/admin/${user._id}`);
        console.log(`I'm navigating to user ${user.name}'s page. ID: ${user._id}`)
    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        navigate("/login");
    }

    if (loading) listContent = <p>Loading...</p>;
    else if (error) listContent = <p>{error}</p>;
    else listContent = <UserList users={users} onUserClick={handleUserClick} />;

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Welcome, {name}!</h2>
            </div>
            <h3>All Users</h3>
            {listContent}
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminPage;