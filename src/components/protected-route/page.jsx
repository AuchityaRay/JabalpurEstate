"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";

const isAuthenticated = () => {
    const token = localStorage.getItem("token-jabalpur-estate-admin");
    const tokenTime = localStorage.getItem("token-time-jabalpur-estate-admin");
    if (!token) {
      return false;
    }
 
    const dif = (Date.now()-tokenTime)/(1000*60*60);
  
    if(dif >= 2){
      localStorage.removeItem("token-jabalpur-estate-admin");
      localStorage.removeItem("token-time-jabalpur-estate-admin");
      return false;
    }
    return !!token;
  };
  
const PrivateRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {

if (!isAuthenticated()) {
    // User is not authenticated, redirect to the login page
    router.push("/");
  }
}, []);

  return children;
};

export default PrivateRoute;
