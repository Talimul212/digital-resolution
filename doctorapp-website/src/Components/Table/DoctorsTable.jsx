import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";
import DoctorModal from "../Modal/DoctorModal";

const DoctorsTable = ({ doctors, loading, error, fetchDoctors }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Calculate total pages
  const usersPerPage = 5;
  const totalPages = Math.ceil(doctors.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedDoctors = doctors.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  // ✅ Function to Delete a Doctor
  const handleDeleteDoctor = async (doctorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this doctor?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const response = await axios.delete(
        `${baseURL}admin/doctors/${doctorId}`
      );

      if (response.status === 200) {
        toast.success("Doctor deleted successfully!");
        fetchDoctors(); // Refresh doctor list
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
      toast.error("Failed to delete doctor.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      {loading && <p>Loading doctors...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {doctors?.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <>
          <table className="min-w-full text-center bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="p-3 border-[1px] border-gray-300">S.No</th>
                <th className="p-3 border-[1px] border-gray-300">Name</th>
                <th className="p-3 border-[1px] border-gray-300">Specialty</th>
                <th className="p-3 border-[1px] border-gray-300">Gender</th>
                <th className="p-3 border-[1px] border-gray-300">Contact</th>
                <th className="p-3 border-[1px] border-gray-300">
                  Availability
                </th>
                <th className="p-3 border-[1px] border-gray-300">
                  Registrations
                </th>
                <th className="p-3 border-[1px] border-gray-300">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedDoctors?.map((doctor, index) => (
                <tr key={doctor._id}>
                  <td className="p-3 border-[1px] border-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {doctor.name}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {doctor.specialty}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {doctor.gender}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {doctor.contact}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    <select>
                      <option>Show availability</option>
                      {doctor?.availability?.map((item, i) => (
                        <option key={i} disabled>
                          {item}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {doctor.registrations}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300 relative w-28">
                    <div className="flex justify-center gap-4 items-center">
                      <p
                        onClick={() => handleEditClick(doctor)}
                        title="Edit"
                        className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                      >
                        <MdOutlineEdit />
                      </p>
                      <p
                        title="Delete"
                        className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                        onClick={() => handleDeleteDoctor(doctor._id)}
                      >
                        {deleting ? "Deleting..." : <MdDeleteOutline />}
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 px-4 py-2 border rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-black"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </>
      )}
      <DoctorModal
        isModalOpen={isModalOpen}
        selectedDoctor={selectedDoctor}
        refreshDoctors={fetchDoctors}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default DoctorsTable;
