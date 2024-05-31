"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [ErrorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("token-jabalpur-estate-admin");
    if (token) {
      router.push("/Dashboard");
    }
  }, []);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        formData, 
        {
          headers: {
            "Content-Type": "application/json",
          },
         
        }
      );
  
      if (response.status === 200) {
        const data = await response.data;
        const token = data.data.token;
        localStorage.setItem("token-jabalpur-estate-admin", token);
        localStorage.setItem("token-time-jabalpur-estate-admin", Date.now());
        router.push("/Dashboard");
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      // setErrorMessage("All the fields are required.");
      }
    } catch (error) {
    
      console.error("Error:", error);
      setErrorMessage("Invalid Credentials.");
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };


  return (
    <>
      <main className="flex min-h-screen bg-gray-100/50 flex-col font-opensans ">
        <div className="flex flex-row w-full min-h-screen">
          <div className="basis-1/2 flex justify-center items-center md:visible invisible  w-full">
            <Image src="/image-left.png" width={800} height={300} alt="Property_image"/>
          </div>
         
          <div className="md:basis-1/2 basis-[100%]  bg-white md:p-0 p-3 md:rounded-l-[65px] flex justify-center items-center w-full">
          <form onSubmit={handleSubmit}>
            <div className=" space-y-10  flex flex-col p-5">
              <h2 className="font-opens text-3xl font-bold text-gray-500">Admin Login</h2>
              <div className="flex flex-col space-y-2 ">
                <label className="font-opensans text-1xl font-semibold">Username</label>
                  <input type="text"  className=" w-96 h-12 border-2 border-gray-200 rounded-md pl-2"
                   onChange={handleInputChange} name="username"  value={formData.username}
                    placeholder="Admin"/>
              </div>
              <div className="flex flex-col space-y-2">
                <label  className="font-opensans text-1xl font-semibold">Password</label>
                  <input  type="password" className="w-96  h-12 border-2 border-gray-200 
                  rounded-md pl-2 " placeholder="********" name="password"  value={formData.password} onChange={handleInputChange}/>
              </div>
              <button type="submit"  className="w-full bg-[#FFBB50] text-white font-bold text-[20px] hover:bg-[#d6a658] p-2 rounded-full">Login</button>
              {ErrorMessage && <div className="text-center text-red-500 text-xl font-semibold">{ErrorMessage}</div>}
            {/* <div className="text-center text-red-500 text-xl font-semibold">{ErrorMessage}</div> */}
            </div>
            </form>
          </div>
          
        </div>
      </main>
    </>
  );
}
