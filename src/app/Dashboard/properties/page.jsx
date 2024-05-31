"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [token, setToken] = useState(null);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const item = localStorage.getItem("token-jabalpur-estate-admin");
        setToken(item);
        const propertiesResponse = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/property/find?page=${currentPage}&limit=50&search=${searchTerm}`,
          {
            headers: {
              Authorization: `Bearer ${item}`,
            },
          }
        );
        const categoryIds = propertiesResponse.data.result.map(
          (property) => property.category_id
        );
        const categoriesResponse = await Promise.all(
          categoryIds.map((categoryId) =>
            axios.get(
              `${process.env.NEXT_PUBLIC_API_URL}/category/findById/${categoryId}`
            )
          )
        );
        if (propertiesResponse.data && propertiesResponse.data.result) {
          setProperties(propertiesResponse.data.result);
          setTotalPages(Math.ceil(propertiesResponse.data.result / 50));
        }
        if (
          categoriesResponse.every(
            (response) => response.data && response.data.result
          )
        ) {
          const fetchedCategories = categoriesResponse.map(
            (response) => response.data.result
          );
          setCategories(fetchedCategories);
          console.log(fetchedCategories);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchProperties();
  }, [currentPage, searchTerm]);
  //Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/property/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        
        router.reload();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

 
  return (
    <>
      <div className=" flex  md:justify-end mr-5 items-center">
        <input
          className="bg-white w-96 rounded-full shadow-lg text-gray-600 hover:bg-[#FFBD59] px-4 outline-none h-12 "
          placeholder="Search "
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6  -ml-[45px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>

        {/* <Image src="/icon/searching.png" width={30} height={30} alt='seach_icon' className='-ml-[45px]'/> */}
      </div>

      <div className="w-full h-fit bg-white my-8 rounded-md shadow-xl">
        <div className="flex flex-col space-y-5 my-5  shadow-md p-5">
          {properties.map((property) => {
            const category = categories.find((category) => category.data.id);
            return (
              <div
                className="flex flex-row space-x-5 border-b p-3 hover:shadow-xl hover:scale-100 rounded-md"
                key={property.id}
              >
                <Link
                  href={{
                    pathname: "/Dashboard/property/",
                    query: { id: property.id },
                  }}
                >
                  <div className="basis-[30%] max-h-[300px] max-w-[400px] items-center">
                    <Image
                      src={property.images[0]}  
                      width={400}
                      height={500}
                      className="max-h-[300px] max-w-[400px]  shadow-sm rounded-md hover:shadow-black hover:shadow-lg"
                      alt={property.images[0]}
                    />
                  </div>
       
                </Link>
                <div className="basis-[100%] flex flex-col space-y-5 py-5">
                  <Link
                    href={{
                      pathname: "/Dashboard/property/",
                      query: { id: property.id },
                    }}
                    className="space-x-3 flex flex-row"
                  >
                    <span className="text-sm md:text-md lg:text-lg xl:text-xl  text-yellow-600 bg-yellow-50 rounded-full px-5 py-2 font-medium">
                      Category - {category.data.name || "Not Found"}
                    </span>
                    <span className="text-sm md:text-md lg:text-lg xl:text-xl  text-yellow-600 bg-yellow-50 rounded-full px-5 py-2 font-medium">
                      Selling Price -₹ {property.seller_price}
                    </span>
                    {/* <span className="text-md  text-yellow-600 bg-yellow-50 rounded-full px-5 font-medium">
                   Ameneties - {property.ameneties[0]}, ...
                  </span> */}
                  </Link>
                  <Link
                    href={{
                      pathname: "/Dashboard/property/",
                      query: { id: property.id },
                    }}
                    className="space-y-2 flex flex-col"
                  >
                    <h2 className="antialiased line-clamp-1 text-2xl leading-relaxed font-semibold text-blue-gray-900">
                      {property.name}
                    </h2>
                    <p
                      className="antialiased line-clamp-3  text-lg leading-relaxed 
            font-medium text-blue-gray-500"
                    >
                      {property.description ? (
                        property.description
                      ) : (
                        <p className="text-yellow-600 text-base ">
                          No description available on this property...
                        </p>
                      )}
                    </p>
                  </Link>
                  <div className="flex flex-row space-x-12 items-center">
                    <div className="flex flex-row space-x-2">
                      <span className="text-lg font-medium">
                        {" "}
                        <b>{property.bedrooms}</b>
                      </span>
                      <Image
                        src="/icon/bed.svg"
                        width={25}
                        height={25}
                        alt="BED"
                        className="text-gray-500"
                      />
                    </div>
                    <div className="flex flex-row space-x-2">
                      <span className="text-lg font-medium">
                        <b>{property.bathrooms}</b>
                      </span>
                      <Image
                        src="/icon/bath.svg"
                        width={25}
                        height={25}
                        alt="BED"
                        className="text-gray-500"
                      />
                    </div>

                    <div className="flex flex-row space-x-2">
                      <span className="text-lg font-medium">
                        <b>{property.no_of_car_parking}</b>
                      </span>
                      <Image
                        src="/icon/car.svg"
                        width={25}
                        height={25}
                        alt="BED"
                        className="text-gray-500"
                      />
                    </div>

                    <button
                      onClick={() => handleDelete(property.id)}
                      className=" rounded-full p-1 bg-yellow-50 hover:bg-yellow-100"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 "
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* <div className="flex justify-center mt-5">
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
        </div> */}
      </div>
    </>
  );
};

export default Properties;
