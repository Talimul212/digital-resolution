import React, { useState } from "react";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";

const PatientRegistration = ({ userID }) => {
  const [formData, setFormData] = useState({
    patientLogID: userID.id,
    name: userID.name || "",
    location: "",
    contact: "",
    gender: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await fetch(`${baseURL}patient/registration`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Patient registered successfully:", result);
        toast.success("Patient registered successfully!");

        window.location.reload();
      } else {
        console.error(
          "Failed to register Patient:",
          result.message || response.statusText
        );
        toast.error(result.message || "Failed to register Patient.");
      }
    } catch (error) {
      console.error("Error submitting Patient registration:", error);
      //   toast.error("An error occurred while registering the Patient.");
    }
  };

  return (
    <div className="p-6 bg-white  mt-[-16px] rounded-md">
      <form onSubmit={handleSubmit} className="space-y-2">
        {/* Name Input */}
        <div className="flex gap-2 justify-between items-center">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name || userID.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
              placeholder="Dr. John Doe"
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Contact
            </label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={(e) =>
                setFormData({ ...formData, contact: e.target.value })
              }
              required
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
              placeholder="+123456789"
            />
          </div>
        </div>

        {/* Location Input */}
        <div className="flex justify-between gap-2">
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <textarea
              type="text"
              name="location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              required
              className="mt-2 block w-full border-[1px] rounded-md bg-white px-3 py-1.5 text-gray-900 outline-gray-300 focus:outline-[#5caff388]"
              placeholder="New York, USA"
            />
          </div>
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={(e) =>
                setFormData({ ...formData, gender: e.target.value })
              }
              className="w-full p-2 border h-15 rounded mt-2 outline-gray-300 focus:outline-[#5caff388]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Address Input */}
        <div></div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-[42vw] mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default PatientRegistration;
