import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/Api/BaseURl";

import AppointmentTable from "../../../Components/Table/AppointmentTable";

const AllAppointment = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = `${baseURL}appointments`;

        // If user is not an admin, fetch only their appointments
        if (storedUser.role !== "admin") {
          url += `?patientId=${storedUser.id}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data?.data);

        // Fetch doctor details for each appointment
        fetchDoctorDetails(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [storedUser.id, storedUser.role]);

  // Fetch doctor details based on doctorId
  const fetchDoctorDetails = async (appointments) => {
    const doctorData = {};

    await Promise.all(
      appointments.map(async (appointment) => {
        if (!doctorData[appointment.doctorId]) {
          try {
            const response = await fetch(
              `${baseURL}doctors/${appointment.doctorId}`
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

    setDoctorDetails(doctorData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-10 px-5">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <AppointmentTable
        storedUser={storedUser}
        appointments={appointments}
        doctorDetails={doctorDetails}
      />
    </div>
  );
};

export default AllAppointment;
