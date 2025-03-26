import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/Api/BaseURl";
import AppovebleTable from "../../../Components/Table/AppovebleTable";

const Appoveble = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [patientDetails, setPatientDetails] = useState({});
  const storedUser = JSON.parse(localStorage.getItem("profileData")) || {};
  useEffect(() => {
    fetchAppointments();
  }, []);
  const fetchAppointments = async () => {
    try {
      let url = `${baseURL}doctor/appointments/${storedUser._id}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch appointments");
      }

      const data = await response.json();
      setAppointments(data?.data);
      fetchPatientDetails(data?.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchPatientDetails = async (appointments) => {
    const doctorData = {};
    await Promise.all(
      appointments.map(async (appointment) => {
        if (!doctorData[appointment.doctorId]) {
          try {
            const response = await fetch(
              `${baseURL}loop/${appointment.patientId}`
            );
            if (response.ok) {
              const data = await response.json();
              doctorData[appointment.doctorId] = data?.data;
            }
          } catch (error) {
            console.error("Error fetching doctor details:", error);
          }
        }
      })
    );
    setPatientDetails(doctorData);
  };
  console.log("data", patientDetails);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Errr: {error}</div>;
  return (
    <div>
      {" "}
      <div className="mt-10 px-5">
        <h2 className="text-2xl font-bold mb-4">Appointments</h2>
        <AppovebleTable
          storedUser={storedUser}
          fetchAppointments={fetchAppointments}
          setAppointments={setAppointments}
          appointments={appointments}
          patientDetails={patientDetails}
        />
      </div>
    </div>
  );
};

export default Appoveble;
