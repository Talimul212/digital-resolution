import React, { useEffect, useState } from "react";
import { baseURL } from "../../../utility/Api/BaseURl";

const Appoveble = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user")) || {};
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let url = `${baseURL}doctor/appointments/${storedUser.id}`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }

        const data = await response.json();
        setAppointments(data?.data);
        console.log(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [storedUser.id]);
  console.log(appointments);

  return <div></div>;
};

export default Appoveble;
