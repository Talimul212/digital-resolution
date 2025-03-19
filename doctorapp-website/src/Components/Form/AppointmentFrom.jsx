import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";

const AppointmentForm = () => {
  const location = useLocation();
  const doctor = location.state?.doctor;
  const navigate = useNavigate();
  // Get user data from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  // Initialize state with default values
  const [formData, setFormData] = useState({
    name: storedUser.name || "",
    email: storedUser.email || "",
    contact: "",
    gender: "Male",
    address: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get user from localStorage

    // Construct appointment data
    const appointmentData = {
      doctorId: doctor?._id, // Assuming doctor object contains _id
      patientId: storedUser?.id, // Assuming storedUser contains _id
      dateTime: doctor?.availability?.[0] || new Date().toISOString(), // Select first available date or fallback to current date
      status: "booked",
      contact: formData.contact,
      gender: formData.gender,
      address: formData.address,
    };

    try {
      const response = await fetch(`${baseURL}appointments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appointmentData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Appointment booked successfully:", result);
        toast.success("Appointment booked successfully!");
        navigate("/doctorslist");
      } else {
        console.error("Failed to book appointment:", response.statusText);
        toast.error("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error submitting appointment:", error);
      toast.error("An error occurred while booking the appointment.");
    }
  };

  return (
    <div className="m-6 p-6 shadow rounded border-[1px] border-[#5caff388]">
      <div className="text-xl font-bold">Appointment Form</div>
      <div className="border-b border-gray-900/10 pb-12">
        <p className="mt-1 text-sm/6 text-gray-600">
          Use valid information where you can receive emails on your health
          tips.
        </p>
        <p className="mt-3 font-semibold">Doctor Details:</p>
        <div className="flex justify-between items-center">
          <div>
            <p>Doctor Name: {doctor?.name}</p>
            <p>Specialty: {doctor?.specialty}</p>
            <p>Location: {doctor?.location}</p>
          </div>
          <div className="">
            <label
              htmlFor="availability"
              className="block text-sm font-medium text-gray-900"
            >
              Select Availability
            </label>
            <select
              id="availability"
              name="availability"
              value={formData.availability}
              onChange={(e) =>
                setFormData({ ...formData, availability: e.target.value })
              }
              className="block w-full rounded-md bg-white py-1.5 px-3 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600 sm:text-sm"
            >
              <option value="">Select a time slot</option>
              {doctor?.availability?.map((i, index) => (
                <option key={index} value={i}>
                  {i.slice(0, 10)} - {i.slice(11, 16)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mt-10">
            <div className="md:flex gap-4 justify-between">
              <div className="w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Patient Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-[#5caff388] border-[1px] sm:text-sm/6"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Patient Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-[#5caff388] border-[1px] sm:text-sm/6"
                />
              </div>
            </div>

            <div className="md:flex mt-5 gap-4 justify-between">
              <div className="w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Contact Number
                </label>
                <input
                  type="number"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  className="block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-[#5caff388] sm:text-sm/6"
                />
              </div>

              <div className="w-full">
                <label className="block text-sm/6 font-medium text-gray-900">
                  Gender
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-gray-300 border-[1px] focus:outline-[#5caff388] sm:text-sm/6"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Others</option>
                </select>
              </div>
            </div>

            <div className="w-full mt-5">
              <label className="block text-sm/6 font-medium text-gray-900">
                Address
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                className="block w-full border-[1px] borer-[#5caff388] rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-gray-300 focus:outline-[#5caff388] sm:text-sm/6"
              />
            </div>
            {!formData.address ||
            !formData.availability ||
            !formData.contact ||
            !formData.gender ? (
              <button className="mt-5 font-bold bg-gray-400 poin text-white px-4  py-2 rounded  duration-200">
                Submit Appointment
              </button>
            ) : (
              <button
                type="submit"
                className="mt-5 font-bold bg-[#5caff388] text-white px-4 hover:text-gray-500 py-2 rounded  duration-200"
              >
                Submit Appointment
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentForm;
