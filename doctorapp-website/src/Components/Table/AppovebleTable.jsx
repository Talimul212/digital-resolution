import React, { useState } from "react";
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { PiFilePdfBold } from "react-icons/pi";
import PatientModel from "../Modal/PatientModel";
const AppovebleTable = ({
  appointments,
  setAppointments,
  patientDetails,
  fetchAppointments,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const usersPerPage = 5;
  const totalPages = Math.ceil(appointments.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedappointments = appointments.slice(
    startIndex,
    startIndex + usersPerPage
  );
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleEditClick = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };
  const deleteAppointment = async (appointmentId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this appointment?"
    );
    if (!confirmDelete) return;

    try {
      setLoading(true);
      const response = await fetch(
        `${baseURL}admin/appointment/${appointmentId}`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) => appointment._id !== appointmentId
          )
        );
        toast.success("Appointment deleted successfully!");
      } else {
        throw new Error(data.message || "Failed to delete appointment");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Error deleting appointment: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const generatePDF = (appointment) => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Appointment Details", 70, 20);

    const columns = ["Field", "Details"];
    const rows = [
      ["Doctor", patientDetails[appointment.doctorId]?.name || "N/A"],
      ["Specialty", patientDetails[appointment.doctorId]?.email || "N/A"],
      ["Date & Time", new Date(appointment.dateTime).toLocaleString()],
      ["Status", appointment.status],
      ["Contact", appointment.contact],
      ["Gender", appointment.gender],
      ["Description", appointment.address],
    ];

    // Use autoTable plugin correctly
    autoTable(doc, { head: [columns], body: rows, startY: 30 });

    doc.save(`Patient${appointment._id}.pdf`);
  };
  console.log(appointments);

  return (
    <div>
      <div>
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {appointments?.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <>
            <table className="min-w-full text-center bg-white border border-gray-200">
              <thead>
                <tr>
                  <th className="p-3 border-[1px] border-gray-300">S.No</th>
                  <th className="p-3 border-[1px] border-gray-300">Patient</th>
                  <th className="p-3 border-[1px] border-gray-300">Email</th>

                  <th className="p-3 border-[1px] border-gray-300">
                    Date & Time
                  </th>
                  <th className="p-3 border-[1px] border-gray-300">Status</th>
                  <th className="p-3 border-[1px] border-gray-300">Contact</th>
                  <th className="p-3 border-[1px] border-gray-300">Gender</th>
                  <th
                    title="Describe Symptomps"
                    className="p-3 border-[1px] border-gray-300"
                  >
                    Description
                  </th>
                  <th className="p-3 border-[1px] border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedappointments?.map((appointment, i) => (
                  <tr key={appointment?._id}>
                    <td className="p-3 border-[1px] border-gray-300">
                      {startIndex + i + 1}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {patientDetails[appointment?.doctorId]
                        ? patientDetails[appointment?.doctorId].name
                        : "Loading..."}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {patientDetails[appointment.doctorId]
                        ? patientDetails[appointment.doctorId].email
                        : "Loading..."}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {new Date(appointment?.dateTime).toLocaleString()}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {appointment.status}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {appointment.contact}
                    </td>
                    <td className="p-3 border-[1px] border-gray-300">
                      {appointment.gender}
                    </td>
                    <td
                      title={appointment.address}
                      className="p-3 border-[1px] border-gray-300"
                    >
                      {appointment.address.slice(0, 20)}..
                    </td>
                    <td className="p-3 border-[1px] border-gray-300 relative w-28">
                      <div className="flex justify-start gap-4 items-center">
                        <p
                          onClick={() => generatePDF(appointment)}
                          title="Edit"
                          className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                        >
                          <PiFilePdfBold />
                        </p>

                        <p
                          onClick={() => handleEditClick(appointment)}
                          title="Edit"
                          className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                        >
                          <MdOutlineEdit />
                        </p>

                        <p
                          //   onClick={() => deleteAppointment(appointment._id)}
                          title="Cancel"
                          className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                        >
                          <MdDeleteOutline />
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
      </div>
      <PatientModel
        isModalOpen={isModalOpen}
        selectedDoctor={selectedDoctor}
        refreshDoctors={fetchAppointments}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default AppovebleTable;
