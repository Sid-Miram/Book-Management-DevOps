import React, { useState, useEffect } from "react";

const GoogleLogin = () => {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  // Google Login Redirect
  const handleGoogleLogin = () => {
    window.open("http://localhost:6000/auth/google", "_self");
  };

  // Fetch User Info from /user Route
  const fetchUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:6000/user", {
        method: "GET",
        credentials: "include", // ✅ Include credentials for cookies
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUser(null);
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      {!authChecked ? (
        <p>Checking authentication...</p>
      ) : user ? (
        <div className="p-6 bg-green-100 border border-green-500 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-green-600">Login Successful</h2>
          <p className="text-gray-700 mt-2">Welcome, {user.name}!</p>
          <p className="text-gray-600">Role: {user.role}</p>
          <p className="text-gray-600">Email: {user.username}</p>
          <img src={user.ownerImg} alt="User" className="mt-4 w-20 h-20 rounded-full border" />
        </div>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Continue with Google
        </button>
      )}
    </div>
  );
};

export default GoogleLogin;
