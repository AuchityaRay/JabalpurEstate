"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const ContactUsInquires = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const item = localStorage.getItem("token-jabalpur-estate-admin");
    setToken(item);
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/contactus/find?page=${currentPage}&limit=10&search=${searchTerm}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.result);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, searchTerm, token]);


 
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };


  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };




  ///Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/contactus/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchData(); // Refetch data after successful deletion
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  return (
    <>
    <div className=" flex  md:justify-start mr-5 items-center">
        <input
          className="bg-white w-96 rounded-full shadow-lg text-gray-600 hover:bg-[#FFBD59] px-4 outline-none h-12 "
          placeholder="Search "  value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" 
        strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  -ml-[45px]">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
</svg>
      </div>
    <div className="w-full h-fit bg-white my-8 px-2 py-5 rounded-md shadow-xl">
      
      <table className='table-fixed w-full'>
        <thead >
          <tr className=' border-b-2'>
            <th className='py-2'>S.No.</th>
            <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>How You Find?</th>
              <th>Date</th>
              <th>Action</th> 

          </tr>
        </thead>
        <tbody>
        {data.map((item, index) => (
        <tr className='text-center border-b-2 text-md' key={index} >
          <td className="py-3" >{index + 1}</td>
          <td>
            {item.fullname ? (
                      item.fullname
                    ) : (
                      <p className="text-yellow-600 text-base ">
                          Name not found...
                      </p>
                    )} 
          </td>
                <td>{item.email ? (
                      item.email
                    ) : (
                      <p className="text-yellow-600 text-base ">
                       Email not found...
                      </p>
                    )}</td> 
            <td>{item.phone ? (
                      item.phone
                    ) : (
                      <p className="text-yellow-600 text-base ">
                       Contact number not found...
                      </p>
                    )}</td> 
                  <td>{item.how_you_find ? (
                      item.how_you_find
                    ) : (
                      <p className="text-yellow-600 text-base ">
                       Not found...
                      </p>
                    )}</td> 
                <td>{formatDate(item.created_at)}</td>
                
                <td className="py-3 flex justify-center">
                 <button onClick={() => handleDelete(item.id)} className="hover:bg-red-100 rounded-full p-3"> <Image src="/icon/trash.png" width={25} height={25} alt="Trash" /></button>
                </td>
          </tr>
               ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-5">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button 
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`mx-1 px-3 py-1 text-lg rounded-md  shadow-sm ${
                currentPage === index + 1 ? "bg-yellow-400 shadow-xl" : "bg-gray-100 shadow-md"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
    </div>
   
    </>
  )
}

export default ContactUsInquires