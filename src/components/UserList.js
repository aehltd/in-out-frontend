import React from "react";

const UserList = ({ users, onUserClick }) => {
  return (
    <div>
      <p className="text-xl font-bold">All users</p>
        <ul className="list-none text-left max-h-80 overflow-y-auto pr-4">
          {users.map((user) => (
            <li className="bg-gray-200 first:mt-0 last:mb-0 mt-2 mb-2 p-3 rounded-lg" key={user._id} onClick={() => onUserClick(user)}>
              {user.name} ({user.email})
            </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
