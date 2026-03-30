import React, { useState } from "react";

const Profile = () => {
  const [user, setUser] = useState({
    name: "Syed User",
    email: "syed@example.com",
    phone: "9876543210",
  });

  const [editing, setEditing] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-red-500">
        👤 User Profile
      </h1>

      <div className="bg-gray-800 p-6 rounded-xl shadow-lg max-w-md">
        <div className="mb-4">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            disabled={!editing}
            className="w-full p-2 mt-1 rounded bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            disabled={!editing}
            className="w-full p-2 mt-1 rounded bg-gray-700"
          />
        </div>

        <div className="mb-4">
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            disabled={!editing}
            className="w-full p-2 mt-1 rounded bg-gray-700"
          />
        </div>

        {editing ? (
          <button
            onClick={handleSave}
            className="bg-green-500 px-4 py-2 rounded hover:bg-green-600"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
