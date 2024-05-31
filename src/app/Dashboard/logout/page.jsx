"use client"


// components/LogoutButton.js
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const Logout = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Remove the token from localStorage
    localStorage.removeItem("token");

    // Redirect the user to the login page
    router.push("./");
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
