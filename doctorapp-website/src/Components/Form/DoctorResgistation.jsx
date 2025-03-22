import React, { useState } from "react";
import { toast } from "react-toastify";
import { baseURL } from "../../utility/Api/BaseURl";

const DoctorRegistration = ({ userID }) => {
  const [formData, setFormData] = useState({
    doctorLogID: userID.id,
    name: userID.name || "",
    email: userID.email,
    specialty: "",
    location: "",
    availability: [],
    rating: "",
    registrations: "Pending",
    contact: "",
    gender: "",
  });

  const [availabilityEntry, setAvailabilityEntry] = useState({
    date: "",
    time: "",
  });

  // Handle changes for date and time
  const handleAvailabilityChange = (e) => {
    setAvailabilityEntry({
      ...availabilityEntry,
      [e.target.name]: e.target.value,
    });
  };

  // Convert local date & time to UTC ISO format and add to the list
  const addAvailability = () => {
    if (availabilityEntry.date && availabilityEntry.time) {
      const localDateTime = new Date(
        `${availabilityEntry.date}T${availabilityEntry.time}`
      );
      const utcDateTime = localDateTime.toISOString(); // Convert to UTC ISO format

      setFormData({
        ...formData,
        availability: [...formData.availability, utcDateTime],
      });

      // Reset input fields after adding
      setAvailabilityEntry({ date: "", time: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseURL}doctor/registration`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Doctor registered successfully:", result);
        toast.success("Doctor registered successfully!");
        // Optionally, navigate or reset form
        setFormData({
          doctorLogID: userID.id,
          name: userID.name || "",
          email: userID.email,
          specialty: "",
          location: "",
          availability: [],
          rating: "",
          registrations: "Pending",
          contact: "",
          gender: "",
        });
        window.location.reload();
      } else {
        console.error("Failed to register doctor:", response.statusText);
        toast.error("Failed to register doctor.");
      }
    } catch (error) {
      console.error("Error submitting doctor registration:", error);
      toast.error("An error occurred while registering the doctor.");
    }
  };

  return (
    <div className=" p-6 bg-white  mt-[-16px] rounded-md">
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
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Dr. John Doe"
            />
          </div>

          {/* Specialty Input */}
          <div className="w-full">
            <label className="block text-sm font-medium text-gray-700">
              Specialty
            </label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              required
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Cardiologist, Neurologist, etc."
            />
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="New York, USA"
          />
        </div>

        {/* Availability Selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Select Availability
          </label>
          <div className="flex gap-2">
            {/* Date Picker */}
            <input
              type="date"
              name="date"
              value={availabilityEntry.date}
              onChange={handleAvailabilityChange}
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Time Picker */}
            <input
              type="time"
              name="time"
              value={availabilityEntry.time}
              onChange={handleAvailabilityChange}
              className="w-full p-2 border border-gray-300 rounded"
            />

            {/* Add Availability Button */}
            <button
              type="button"
              onClick={addAvailability}
              className="bg-blue-500 text-white px-4 rounded"
            >
              Add
            </button>
          </div>
        </div>

        {/* Display Selected Availability */}
        {formData.availability.length > 0 && (
          <div className="mt-4">
            <h3 className="font-medium">Selected Availability (UTC):</h3>
            <ul className="list-disc pl-1 flex justify-start gap-2 flex-wrap rounded text-sm text-gray-600">
              {formData.availability.map((slot, index) => (
                <div
                  className="shadow-md p-1 border-[1px] border-amber-100 "
                  key={index}
                >
                  {new Date(slot).toLocaleString()}
                </div>
              ))}
            </ul>
          </div>
        )}

        {/* Contact Input */}
        <div>
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
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="+123456789"
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
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Address Input */}
        <div></div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DoctorRegistration;
