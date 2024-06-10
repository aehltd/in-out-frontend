import React from 'react';

const UserList = ({ users, onUserClick }) => {
    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user._id}>
                        <button onClick={() => onUserClick(user)}>
                            {user.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserList;