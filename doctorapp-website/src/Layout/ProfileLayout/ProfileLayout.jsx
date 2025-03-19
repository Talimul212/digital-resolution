import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import { Link, Outlet } from "react-router-dom";
import { MdManageAccounts } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
const ProfileLayout = () => {
  return (
    <div>
      <Navbar />
      <div className=" grid grid-cols-12 gap-2">
        <div className=" col-span-1 bg-[#5caff3] shadow  rounded-e-2xl border-[1px] h-[83vh] border-gray-300 mt-7 w-[124px]">
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
        </div>
        <div className=" border-[1px] mt-7 rounded mx-5 bg-white border-gray-200 col-span-11">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
