import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
const Navbar = () => {
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from local storage
    toast.success("You have been logged out.");
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      <div className="navbar shadow-sm bg-[#5caff388]">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Doctors</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>
          <Link
            className="md:flex cursor-pointer hidden  bg-amber-50  absolute mt-[-2px] pt-3 px-5 ms-[10px] h-[100px]  rounded-b-2xl border-[#5caff3] border-b-[1px] duration-300 justify-center items-center"
            to="/"
          >
            <img src={logo} className="w-16" alt="" srcset="" />
            <p className="text-2xl hidden md:block uppercase tracking-[.28em] font-bold text-[#5caff3]">
              Esefa
            </p>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li className="  text-md font-bold text-white">
              <Link to="/doctorslist">Doctors</Link>
            </li>
            <li className=" font-bold text-md text-white">
              <Link to="/contact">Contact</Link>
            </li>
            <li className="  text-md font-bold text-white">
              <Link to="/aboutus">About Us</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {localStorage.token ? (
            <>
              <Link className="btn bg-white me-2" to="/profile">
                profile
              </Link>
              <button onClick={handleLogout} className="btn bg-white">
                LogOut
              </button>
            </>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
