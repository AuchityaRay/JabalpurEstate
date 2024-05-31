"use client"
import Image from "next/image";
import React , { useState, useEffect} from "react";
import Properties from "./properties/page";
import Link from "next/link";
import axios from "axios";


const Dashboard = () => {
  const [properties, setProperties] = useState([]);
  const [category, setCategories] = useState([]);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const item = localStorage.getItem("token-jabalpur-estate-admin");
    setToken(item);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/property/find?limit=10&page=1&sort[updated_at]=desc`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        if (data && data.result) {
          setProperties(data.result);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    const item = localStorage.getItem("token-jabalpur-estate-admin");
    setToken(item);
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/find`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        const data = response.data;
        setCategories(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <div className="flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-10 font-opensans">
        <div className="p-5 bg-white w-72  rounded-lg shadow-xl hover:shadow hover:shadow-yellow-200">
          <div className="flex space-x-2 justify-between items-center">
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl ">{properties.length}</h2>
              <p className="text-1xl text-gray-500">Properties</p>
            </div>
            <div>
              <Image
                src="/icon/building.png"
                className=""
                width={40}
                height={40}
                alt="Property"
              />
            </div>
          </div>
      
        </div>
      
        <div className="  p-5 bg-white w-72  rounded-lg shadow-xl hover:shadow hover:shadow-yellow-200">
         
          <div className="flex space-x-2 justify-between items-center">
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl ">{category}</h2>
              <p className="text-1xl text-gray-500">Categories</p>
            </div>
            <div>
              <Image
                src="/icon/category.png"
                className=""
                width={40}
                height={40}
                alt="Property"
              />
            </div>
          </div>
         
        </div>
        
      </div>
      <Properties id="property"/>
      
    </>
  );
};

export default Dashboard;
