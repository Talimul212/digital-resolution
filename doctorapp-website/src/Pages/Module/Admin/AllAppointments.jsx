import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/Api/BaseURl";
import AppointmentTable from "../../../Components/Table/AppointmentTable";

const AllAppointments = () => {
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  const [appointments, setAppointments] = useState([]);
  const [doctorDetails, setDoctorDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = `${baseURL}admin/allappointment`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data?.data);
        console.log(data?.data);

        fetchDoctorDetails(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [storedUser.id, storedUser.role]);

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
    console.log("dat", doctorData);

    setDoctorDetails(doctorData);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Errr: {error}</div>;

  return (
    <div className="mt-10 px-5">
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>
      <AppointmentTable
        storedUser={storedUser}
        setAppointments={setAppointments}
        appointments={appointments}
        doctorDetails={doctorDetails}
      />
    </div>
  );
};

export default AllAppointments;
