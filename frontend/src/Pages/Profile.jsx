import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Profile({ user, setUser }) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user);
    if (!user) {
      const userD = JSON.parse(localStorage.getItem("user"));
      console.log(userD);
      if (userD) {
        setUser(userD);
      } else {
        navigate("/auth");
      }
    }
  }, [user, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {user && (
        <div
          id="ProfileCard"
          className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center text-center space-y-4 w-full max-w-sm"
        >
          <img
            className="h-32 w-32 rounded-full border-4 border-blue-500 shadow-md object-cover"
            src={user.avatar || 'https://via.placeholder.com/150'}
            alt="avatar"
          />
          <h1 className="text-2xl font-semibold text-gray-800">{user.name}</h1>
          <h2 className="text-gray-600">{user.email}</h2>

          <button
            onClick={() => {
              setUser(null);
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              navigate("/auth");
            }}
            className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition-all duration-200"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
