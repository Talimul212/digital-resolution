import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdPreview } from "react-icons/md";
import { MdGroups2 } from "react-icons/md";
import { MdApproval } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";
import { FaWpforms } from "react-icons/fa6";
const ProfileLayout = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  return (
    <div>
      <Navbar />
      <div className=" grid grid-cols-12 gap-2">
        <div className=" pt-2 col-span-1 bg-[#5caff3] shadow  rounded-e-lg border-[1px] h-[83vh] border-gray-300 mt-7 w-[140px]">
          <Link
            className="flex p-2 justify-start mt-3 gap-2 hover:bg-amber-50 hover:text-black  font-semibold duration-300  items-center text-white"
            to="/profile/details"
          >
            <MdManageAccounts size={23} />
            My account
          </Link>
          {storedUser.role === "patient" && (
            <>
              <Link
                className=" mt-3 hover:bg-amber-50 duration-300 hover:text-black flex p-2 justify-start font-semibold gap-2 items-center text-white"
                to="/profile/allappointment"
              >
                <FaClipboardList size={23} />
                Appointments
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-300 hover:text-black font-semibold justify-start p-2 gap-2 items-center text-white"
                to="/profile/reviews"
              >
                <MdPreview size={20} />
                Review
              </Link>
            </>
          )}
          {storedUser?.role === "doctor" && (
            <>
              <Link
                className="flex text-center mt-3 p-2 hover:bg-amber-50 duration-300 hover:text-black  font-semibold justify-start gap-2 items-center text-white"
                to="/profile/appoveblelist"
              >
                <MdApproval size={23} />
                Approveble
              </Link>
            </>
          )}{" "}
          {storedUser?.role === "admin" && (
            <>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-300 hover:text-black gap-2 p-2 font-semibold justify-start items-center text-white"
                to="/profile/alluser"
              >
                <MdGroups2 size={23} />
                Users
              </Link>
              <Link
                className="flex mt-3 p-2 hover:bg-amber-50 duration-300 hover:text-black  font-semibold gap-2 justify-start items-center text-white"
                to="/profile/alldoctor"
              >
                <FaUserDoctor size={23} />
                Doctors
              </Link>
              <Link
                className="flex mt-3 hover:bg-amber-50 duration-300 gap-1 hover:text-black p-2 font-semibold justify-start items-center text-white"
                to="/profile/admin/allappointment"
              >
                <FaWpforms size={23} />
                Appointments
              </Link>
            </>
          )}
        </div>
        <div className=" border-[1px] mt-7 rounded mx-5 bg-white border-gray-200 col-span-11 ms-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
