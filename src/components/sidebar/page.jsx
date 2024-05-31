"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const handleLogout = () => {
    localStorage.removeItem("token-jabalpur-estate-admin");
    localStorage.removeItem("token-time-jabalpur-estate-admin");

    router.push("/");
  };

  return (
    <>
      <div className="bg-white fixed  min-h-screen font-opensans">
        <div className="flex flex-col space-y-5 p-4 items-center">
          <div className="border-b-[1px] pb-3 w-full flex justify-center">
            <Image
              src="/jestate.png"
              width={180}
              height={300}
              alt="Jabalpur Real Estate"
            />
          </div>
          <div className="flex flex-col space-y-5 w-full text-gray-600  text-[20px] font-medium">
            <Link
              href="/Dashboard"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard"
                  ? "bg-[#FFBD59] text-white rounded-full "
                  : ""
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-7 h-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                />
              </svg>

              <h2 className="">Dashboard</h2>
            </Link>
            <Link
              href="/Dashboard/add-property"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/add-property"
                  ? "rounded-full  bg-[#FFBD59] text-white "
                  : ""
              }`}
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
                  d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z"
                />
              </svg>

              <h2 className="">Add Property</h2>
            </Link>
            <Link
              href="/Dashboard/categories"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/categories"
                  ? "bg-[#FFBD59]  text-white rounded-full "
                  : ""
              }`}
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
                  d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 6h.008v.008H6V6z"
                />
              </svg>

              <h2 className="">Categories</h2>
            </Link>
            {/*  */}
            <Link
              href="/Dashboard/newsletter"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/newsletter"
                  ? "bg-[#FFBD59]  text-white rounded-full "
                  : ""
              }`}
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
                  d="M21.75 9v.906a2.25 2.25 0 01-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 001.183 1.981l6.478 3.488m8.839 2.51l-4.66-2.51m0 0l-1.023-.55a2.25 2.25 0 00-2.134 0l-1.022.55m0 0l-4.661 2.51m16.5 1.615a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V8.844a2.25 2.25 0 011.183-1.98l7.5-4.04a2.25 2.25 0 012.134 0l7.5 4.04a2.25 2.25 0 011.183 1.98V19.5z"
                />
              </svg>

              <h2 className="">NewsLetter</h2>
            </Link>
            {/*  */}
            <Link
              href="/Dashboard/property-inquires"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/property-inquires"
                  ? "bg-[#FFBD59]  text-white rounded-full "
                  : ""
              }`}
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
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>

              <h2 className="">Property Inquiries</h2>
            </Link>
            {/*  */}
            <Link
              href="/Dashboard/callback-inquires"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/callback-inquires"
                  ? "bg-[#FFBD59]  text-white rounded-full "
                  : ""
              }`}
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
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>

              <h2 className="">Callback Inquiries</h2>
            </Link>
            {/*  */}
            <Link
              href="/Dashboard/contactus-inquires"
              className={`flex flex-row space-x-3 hover:text-white hover:bg-[#FFBD59] 
            py-3 rounded-full w-full px-10 items-center
              ${
                pathname === "/Dashboard/contactus-inquires"
                  ? "bg-[#FFBD59]  text-white rounded-full "
                  : ""
              }`}
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
                  d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z"
                />
              </svg>

              <h2 className="">Contact Us Inquiries</h2>
            </Link>
            {/*  */}
            
          
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
