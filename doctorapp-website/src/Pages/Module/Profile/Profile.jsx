import React, { useEffect, useState } from "react";
import axios from "axios";
import DoctorRegistration from "../../../Components/Form/DoctorResgistation";
import { baseURL } from "../../../utility/Api/BaseURl";
import PatientRegistration from "../../../Components/Form/PatientRegistration";

const Profile = () => {
  const [profileData, setProfileData] = useState({});
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!storedUser || !storedUser.role || !storedUser.id) {
        console.warn("User data is missing from localStorage");
        return;
      }

      if (!profileData.name) {
        const userType = storedUser.role === "doctor" ? "doctors" : "patient"; // Fixed "patient" typo
        const apiUrl = `${baseURL}${userType}/${storedUser.id}`;

        try {
          const response = await axios.get(apiUrl);

          if (response.data) {
            setProfileData(response.data?.data || {});
            if (storedUser.role === "doctor") {
              localStorage.setItem(
                "profileData",
                JSON.stringify(response.data?.data || {})
              );
            }
          }
        } catch (error) {
          console.error(`Error fetching ${userType} details:`, error);
        }
      }
    };

    fetchUserDetails();
  }, [storedUser]);

  if (!profileData) {
    <p>Loading....</p>;
  }

  return (
    <div>
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-2xl mt-6 font-bold text-center">
          <span className="uppercase text-[#5caff3]">{storedUser.role} </span>
          Registration{" "}
          {profileData && (profileData.location || profileData.length > 0)
            ? "Successfully Completed"
            : ""}
        </h2>
        {!profileData?.location && (
          <p className="text-gray-600 text-center mb-6">
            Fill in the form below to register as a{" "}
            <span>{storedUser.role}</span>. Please provide accurate details to
            ensure proper verification.
          </p>
        )}
      </div>

      {/* Display profile data for doctor or patient */}
      {profileData && (profileData.location || profileData.length > 0) ? (
        <div className="p-6 max-w-3xl mx-auto bg-white rounded-lg border-[1px] border-gray-300 mt-10">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            {storedUser?.role
              ? `${
                  storedUser.role.charAt(0).toUpperCase() +
                  storedUser.role.slice(1)
                } Name:`
              : "User"}
            {profileData?.name || "N/A"}
          </h3>
          <div className="space-y-4">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Location:</span>{" "}
              {profileData?.location || "N/A"}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Contact:</span>{" "}
              {profileData?.contact || "N/A"}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Gender:</span>{" "}
              {profileData?.gender || "N/A"}
            </p>
          </div>
        </div>
      ) : (
        <>
          {storedUser?.role === "doctor" && (
            <DoctorRegistration userID={storedUser} />
          )}
          {storedUser?.role === "patient" && (
            <PatientRegistration userID={storedUser} />
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
