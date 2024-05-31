"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [token, setToken] = useState(null);
  const pageSize = 6; 

  useEffect(() => {
    const item = localStorage.getItem("token-jabalpur-estate-admin");
    setToken(item);
  }, []);

  useEffect(() => {
    fetchData();
  },[currentPage]);

  //Total Properties
  axios.get (`${process.env.NEXT_PUBLIC_API_URL}/property/find`)
  .then((response) => {
    const data = response.data;
  ; 
    if (data && data.count) {
      setTotalProperties(data.count);
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

//Categories
  const fetchData = () => {
    const offset = (currentPage - 1) * pageSize;
    let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/category/find?page=${currentPage}&limit=${pageSize}&offset=${offset}`;


    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    };
    axios.get(apiUrl, config)
      .then((response) => {
        const responseData = response.data;
      
        setTotalCategories(responseData.count);
        setCategories(responseData.result);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };


  const handleDeleteCategory = (categoryId) => {
    const deleteUrl = `${process.env.NEXT_PUBLIC_API_URL}/category/delete/${categoryId}`;
    axios
    .delete(deleteUrl, {
      headers: {
        Authorization:
        `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  })
   .then((response) => {
        if (response.status === 200) {
          
          window.location.reload();
          console.log(`Category with ID ${categoryId} has been deleted.`);
         
          setCategories((prevsubscribers) => prevsubscribers.filter((category) => category.id !== categoryId));
          router.reload();
        } else {
          console.error("Unexpected status code:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error deleting subscriber:", error);
      });
  };


  return (
    <>
    <div className="flex md:flex-row flex-col space-y-5 md:space-y-0 md:space-x-10 font-opensans">
        <div className="p-5 bg-white w-72  rounded-lg shadow-xl hover:shadow hover:shadow-yellow-200">
          <div className="flex space-x-2 justify-between items-center">
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl ">{totalProperties}</h2>
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
              <h2 className="font-semibold text-2xl ">{totalCategories}</h2>
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
  
    <div className="w-full h-fit bg-white my-8 px-5 py-5 rounded-md shadow-xl">
    <ul role="list" class="divide-y divide-gray-100">
  
    {categories?.map((category) => (
            <li class="flex justify-between gap-x-6 py-5" key={category.id} >
              <div class="flex min-w-0 gap-x-4 ">
                <Image
                  class="h-12 w-12 flex-none "
                  width={100}
                  height={100}
                  alt="iamge"
                  src="/icon/category.png"
                />
                <div class="min-w-0 flex-auto justify-center">
                  <p class="text-base font-semibold leading-6 text-gray-900">
                  {category.name}
                  </p>
                  {/* <p class="mt-1 truncate text-xs leading-5 text-gray-500">
                 Total Property - 100
                  </p> */}
                </div>
              </div>
              <button onClick={() => handleDeleteCategory(category.id)} class="hidden shrink-0 sm:flex sm:flex-col sm:items-end"  >
                <Image
                  class="h-8 w-8 flex-none "
                  width={100}
                  height={100}
                  alt="iamge"
                  src="/icon/trash.png"
                />
              </button>
            </li>
            ))}
            
          </ul>
          <div className="flex justify-center mt-5">
      {Array.from({ length: Math.ceil(totalCategories / pageSize) }, (_, index) => (
        <button
          key={index}
          className={`mx-2 p-3  border text-sm font-semibold rounded-md  ${
            currentPage === index + 1 ? "bg-[#FFBD59]" : "bg-white"
          }`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
        
      ))}
    </div>
    </div>
    </>
  )
}

export default Categories