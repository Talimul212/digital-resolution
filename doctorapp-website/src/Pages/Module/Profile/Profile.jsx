import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorRegistration from "../../../Components/Form/DoctorResgistation";
import { baseURL } from "../../../utility/Api/BaseURl";

const Profile = () => {
  const [doctorDetails, setDoctorDetails] = useState({});
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      if (storedUser.role === "doctor" && storedUser.id) {
        try {
          const response = await axios.get(
            `${baseURL}doctors/${storedUser.id}`
          );
          if (response.data) {
            setDoctorDetails(response.data?.data || {});
          }
        } catch (error) {
          console.error("Error fetching doctor details:", error);
        }
      }
    };

    fetchDoctorDetails();
  }, [storedUser.role, storedUser.id]);

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-2xl mt-6 font-bold text-center">
          <span className="uppercase text-[#5caff3]">{storedUser.role}</span>{" "}
          Registration
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Fill in the form below to register as a <span>{storedUser.role}</span>
          . Please provide accurate details to ensure proper verification.
        </p>
      </div>

      {/* Display doctor details */}

      {doctorDetails ? (
        <>
          {doctorDetails?.name && (
            <div className="p-4    text-center">
              <h3 className="text-lg font-semibold">
                Doctor Name: {doctorDetails.name}
              </h3>
              <p>Specialty: {doctorDetails.specialty}</p>
              <p>Location: {doctorDetails.location}</p>
              <p>Contact: {doctorDetails.contact}</p>
              <p>Gender: {doctorDetails.gender}</p>
            </div>
          )}
        </>
      ) : (
        <>
          {storedUser?.role === "doctor" && (
            <DoctorRegistration userID={storedUser.id} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
