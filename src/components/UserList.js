import React from "react";

const UserList = ({ users, onUserClick }) => {
  return (
    <div>
      <p className="text-xl font-bold">All users</p>
      <ul className="list">
        {users.map((user) => (
          <li className="list-item" key={user._id} onClick={() => onUserClick(user)}>
            {user.name} ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
