import React, { useEffect, useState } from "react";
import DoctorsTable from "../../../Components/Table/DoctorsTable";
import { baseURL } from "../../../utility/Api/BaseURl";

const AllDoctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${baseURL}doctors`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data?.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return (
    <div className="mt-10 px-5">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <DoctorsTable error={error} loading={loading} doctors={doctors} />
    </div>
  );
};

export default AllDoctor;
