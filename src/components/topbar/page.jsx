"use client"
import React from "react";
import { useRouter, usePathname } from "next/navigation";
const Topbar = () => {
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token-jabalpur-estate-admin");
    localStorage.removeItem("token-time-jabalpur-estate-admin");

    router.push("/");
  };
    const pathname = usePathname();
    let pageTitle = '';

    if (pathname === "/Dashboard") {
      pageTitle = "Dashboard";
    } else if (pathname === "/Dashboard/add-property") {
      pageTitle = "Add Property";
    }
    else if (pathname === "/Dashboard/categories") {
        pageTitle = "Categories";
      }
      else if (pathname === "/Dashboard/property-inquires") {
        pageTitle = "Property Inquires";
      }
      else if (pathname === "/Dashboard/callback-inquires") {
        pageTitle = "Callback Inquires";
      }
      else if (pathname === "/Dashboard/newsletter") {
        pageTitle = "Newsletters";
      }
      else if (pathname === "/Dashboard/contactus-inquires") {
        pageTitle = "Contact Us Inquires";
      }
      else if (pathname === "/Dashboard/property") {
        pageTitle = "Update Property Details";
      }
  return (
    <>
    
      <div className="  justify-between bg-white w-full h-[65px] flex flex-row  items-center px-5 font-opensans">
      
        <div className="  ">
          <h2 className="text-[20px] font-semibold text-gray-600">
           {pageTitle}
            </h2>
        </div>
        <div className="flex flex-row space-x-2 justify-end items-center ">
        <button
              onClick={handleLogout}
              className="flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-2 rounded-full w-full px-5 items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                />
              </svg>

              <h2 className="">Logout</h2>
            </button>
            </div>
        {/* <div className="flex flex-row space-x-2 justify-end items-center ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-gray-600 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>

          <h2 className="text-[20px] font-semibold text-gray-600 font-opensans">Admin</h2>
        </div> */}
      </div>
    </>
  );
};

export default Topbar;
