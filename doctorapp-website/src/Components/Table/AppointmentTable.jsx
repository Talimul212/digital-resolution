import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { baseURL } from "../../utility/Api/BaseURl";
import { PiFilePdfBold } from "react-icons/pi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import toast from "react-hot-toast";
const AppointmentTable = ({
  appointments,
  setAppointments,
  doctorDetails,
  storedUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      ["Doctor", doctorDetails[appointment.doctorId]?.name || "N/A"],
      ["Specialty", doctorDetails[appointment.doctorId]?.specialty || "N/A"],
      ["Date & Time", new Date(appointment.dateTime).toLocaleString()],
      ["Status", appointment.status],
      ["Contact", appointment.contact],
      ["Gender", appointment.gender],
      ["Description", appointment.address],
    ];

    // Use autoTable plugin correctly
    autoTable(doc, { head: [columns], body: rows, startY: 30 });

    doc.save(`appointment_${appointment._id}.pdf`);
  };
  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="min-w-full text-center bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 border-[1px] border-gray-300">S.No</th>
              <th className="p-3 border-[1px] border-gray-300">Doctor</th>
              <th className="p-3 border-[1px] border-gray-300">Specialty</th>
              <th className="p-3 border-[1px] border-gray-300">Date & Time</th>
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
            {appointments.map((appointment, i) => (
              <tr key={appointment._id}>
                <td className="p-3 border-[1px] border-gray-300">{i + 1}</td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctorDetails[appointment.doctorId]
                    ? doctorDetails[appointment.doctorId].name
                    : "Loading..."}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctorDetails[appointment.doctorId]
                    ? doctorDetails[appointment.doctorId].specialty
                    : "Loading..."}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {new Date(appointment.dateTime).toLocaleString()}
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
                    {storedUser?.role == "admin" ? (
                      <p
                        onClick={() => generatePDF(appointment)}
                        title="Edit"
                        className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                      >
                        <PiFilePdfBold />
                      </p>
                    ) : (
                      <p
                        title="Edit"
                        className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                      >
                        <MdOutlineEdit />
                      </p>
                    )}
                    <p
                      onClick={() => deleteAppointment(appointment._id)}
                      title="Cancel"
                      className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                    >
                      <MdDeleteOutline />
                    </p>
                    <p
                      title="Reschedule"
                      className="text-gray-800 text-lg hover:scale-150 duration-300 cursor-pointer bg-sky-200 p-1 rounded"
                    >
                      <IoEyeOutline />
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AppointmentTable;
