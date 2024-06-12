import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserList from '../../components/UserList';
import { fetchAllUsers } from '../../api/userAPI';
import { setCacheUser, emptyCache } from '../../utils/cache';

const AdminPage = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const role = localStorage.getItem('role');

    // States for user list
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    let pageContent;

    //Validators
    useEffect(() => {if (!token) navigate('/login')}, [token, navigate]);
    useEffect(() => {if (role !== 'admin') navigate('/access-denied');}, [role, navigate]);

    // Fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            console.log('Fetching users...');
            try {
                const data = await fetchAllUsers(token);
                setUsers(data);
                data.forEach(user => 
                    setCacheUser(user._id, user)
                );
                console.log('Users fetched and cached.');
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchUsers();
    }, [token]);
    
    // Handlers
    // Handle user click
    const handleUserClick = (user) => {
        //navigate(`/admin/${user._id}`);
        console.log(`I'm navigating to user ${user.name}'s page. ID: ${user._id}`)
        navigate(`/admin/users/${user._id}`);
    }

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('role');
        emptyCache();
        navigate("/login");
    }

    if (loading) pageContent = <p>Loading...</p>;
    else if (error) pageContent = <p>{error}</p>;
    else pageContent = <UserList users={users} onUserClick={handleUserClick} />;

    return (
        <div>
            <h1>Admin Page</h1>
            <div>
                <h2>Welcome, {name}!</h2>
            </div>
            <h3>All Users</h3>
            {pageContent}
            <div>
                <button onClick={handleLogout}>Logout</button>
            </div>
        </div>
    );
};

export default AdminPage;