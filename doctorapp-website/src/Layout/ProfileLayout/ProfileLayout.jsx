import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";
const ProfileLayout = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div>
      <Navbar />
      <div className=" grid grid-cols-12 gap-2">
        <div className=" col-span-1 bg-[#5caff3] shadow  rounded-e-2xl border-[1px] h-[83vh] border-gray-300 mt-7 w-[124px]">
          {storedUser.role === "patient" && (
            <>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/details"
              >
                <MdManageAccounts size={23} />
                My account
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/allappointmen"
              >
                <FaClipboardList size={23} />
                Appointments
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/reviews"
              >
                <MdPreview size={23} />
                Review
              </Link>
            </>
          )}
          {storedUser.role === "doctor" && (
            <>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/details"
              >
                <MdManageAccounts size={23} />
                My account
              </Link>
              <Link
                className="flex text-center mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/details"
              >
                <MdManageAccounts size={23} />
                Appointment Requests
              </Link>
            </>
          )}{" "}
          {storedUser.role === "admin" && (
            <>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/details"
              >
                <MdManageAccounts size={23} />
                My account
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/alluser"
              >
                <MdGroups2 size={23} />
                Users
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/alldoctor"
              >
                <FaUserDoctor size={23} />
                Doctors
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-200 hover:text-black flex-col font-semibold justify-between items-center text-white"
                to="/profile/allappointment"
              >
                <FaWpforms size={23} />
                Appointments
              </Link>
            </>
          )}
        </div>
        <div className=" border-[1px] mt-7 rounded mx-5 bg-white border-gray-200 col-span-11">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
