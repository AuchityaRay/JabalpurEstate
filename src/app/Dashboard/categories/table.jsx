import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [totalCategories, setTotalCategories] = useState(0);

  useEffect(() => {
    // Make a GET request to the API endpoint
    axios.get("http://35.175.230.31/api/v1/category/find?page=1")
      .then((response) => {
        const data = response.data;
        if (data && data.result) {
          setCategories(data.result);
          setTotalCategories(data.totalCategories);
        }
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
              <h2 className="font-semibold text-2xl ">{totalCategories}</h2>
              <p className="text-1xl text-gray-500">Categories</p>
            </div>
            <div>
              <Image
                src="/icon/category.png"
                className=""
                width={40}
                height={40}
                alt="Category"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Display the categories data */}
      <div className="w-full h-fit bg-white my-8 rounded-md shadow-xl">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-4 p-2">
          {categories.map((category) => (
            <div
              key={category.id}
              className="w-fit h-fit p-2 rounded-md hover:shadow-lg relative"
            >
              <Image
                src={category.imageUrl}
                width={500}
                height={500}
                alt={`Category Image - ${category.name}`}
                className="shadow-sm rounded-sm"
              />
              <div className="flex justify-center">
                <button className="text-gray-800  bg-[#FFBD59] hover:bg-[#FFBD59] bg-opacity-80 rounded-full p-3 font-semibold text-2xl w-48 shadow-md absolute top-28">
                  {category.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
