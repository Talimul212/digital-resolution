import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";

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
        <img
          alt="Your Company"
          src="bycicle.png"
          className="mx-auto h-20 w-auto"
        />
        <h2 className="mt-5 text-center text-2xl font-bold tracking-tight text-gray-900">
          Register to Create an Account
        </h2>
      </div>

      <div className="mt-5 shadow-xl rounded p-3 border border-amber-100 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-900"
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
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-900"
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
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-900"
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
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-indigo-600"
            />
          </div>

          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-900"
            >
              Select Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-indigo-600"
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
            </select>
          </div>

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-[#e5646e] px-3 py-1.5 text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-indigo-600"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
