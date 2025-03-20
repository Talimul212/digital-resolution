import React, { useState, useEffect } from "react";
import { baseURL } from "../../utility/Api/BaseURl";
import doc1 from "../../assets/Doctors/doctor1.webp";
import doc2 from "../../assets/Doctors/doctor2.png";
import doc3 from "../../assets/Doctors/doctor3.jpg";
import doc4 from "../../assets/Doctors/doctor4.webp";
import doc5 from "../../assets/Doctors/doctor5.png";
import { Link } from "react-router-dom";

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const doctorImages = [doc1, doc2, doc3, doc4, doc5];

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`${baseURL}doctors`);
        if (!response.ok) {
          throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        setDoctors(data?.data || []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  console.log(doctors);

  return (
    <div className="mt-10 mx-5  mb-5">
      <h2 className="text-2xl font-bold mb-4">Doctors List</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors
          ?.filter((doctor) => doctor.registrations === "Approved") // Filtering approved doctors
          .map((doctor, index) => (
            <li
              key={doctor?.id}
              className="p-4 border-[1px] border-[#5caff3] rounded shadow flex flex-col items-center"
            >
              <img
                src={doctorImages[index % doctorImages?.length]} // Assigning images in a loop
                className="w-32 h-32 rounded-full object-cover mb-3"
              />
              <h3 className="text-xl font-semibold">{doctor?.name}</h3>
              <p>
                <strong>Specialty:</strong> {doctor?.specialty}
              </p>
              <p>
                <strong>Location:</strong> {doctor?.location}
              </p>
              <Link
                to={{
                  pathname: "/appointmentForm",
                }}
                state={{ doctor }}
                className="p-2 hover:bg-accent rounded-b-none duration-200 rounded-t-xl mt-4 mb-[-17px] z-40  text-amber-50 bg-[#5caff3] rounded cursor-pointer font-bold"
              >
                Appointment
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DoctorsList;
