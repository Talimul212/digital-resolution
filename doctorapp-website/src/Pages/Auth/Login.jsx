import React, { useState } from "react";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${baseURL}auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token & user info in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");
      console.log("Logged-in user:", data.user);

      // Redirect or perform actions after login
      window.location.href = "/";
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
          <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-gray-900">
            Login to your account
          </h2>
        </div>

        <div className="shadow-xl p-3 border border-amber-100 rounded sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-[#5caff388] px-3 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-[#5caff3e8]"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </div>
          </form>

          <p className="my-5 font-semibold text-center text-sm text-gray-500">
            Dont have an account to{" "}
            <span className="text-[#5caff3e8]">ESEFA</span>? Please go to
            <span> </span>
            <Link
              to="/signup"
              className="font-semibold cursor-pointer text-[#5caff3e8]"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
