import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient", // Default role
  });

  // Input change handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Registration successful!");
        navigate("/"); // Redirect to home
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto mt-3 sm:w-full sm:max-w-sm">
        <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
        <h2 className="mt-1 text-center text-2xl font-bold tracking-tight text-gray-900">
          Register to Create an Account
        </h2>
      </div>

      <div className="mt-5 shadow-xl rounded p-3 border border-amber-100 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mt-[-2px] text-gray-900"
            >
              Full Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm mt-[-5px] font-medium text-gray-900"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mt-[-5px] text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block mt-[-5px] text-sm font-medium text-gray-900"
            >
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full  bg-[#5caff388] hover:bg-[#5caff3e8] justify-center rounded-md  px-3 py-1.5 text-white shadow-xs  focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </form>
        <p className="mt-1 font-semibold text-center text-sm text-gray-500">
          Already have an account? Go to
          <span>
            <p></p>
            <Link
              to="/login"
              className="font-semibold cursor-pointer text-[#5caff3e8]"
            >
              Login
            </Link>
            <span> </span>
          </span>
          page
        </p>
      </div>
    </div>
  );
};

export default Register;
