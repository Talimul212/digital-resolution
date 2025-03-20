import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import { baseURL } from "../../utility/Api/BaseURl";

const AppointmentTable = ({ appointments, doctorDetails }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cancelOrRescheduleAppointment = async (
    appointmentId,
    status,
    newDateTime = null
  ) => {
    setLoading(true);
    try {
      const response = await fetch(`${baseURL}appointments/${appointmentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status, newDateTime }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the appointment");
      }

      const result = await response.json();
      alert(result.message); // Show success message
      // Optionally, you can refresh the appointments list or make necessary updates
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
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
              <th className="p-3 border-[1px] border-gray-300">Address</th>
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
                <td className="p-3 border-[1px] border-gray-300">
                  {appointment.address}
                </td>
                <td className="p-3 border-[1px] border-gray-300 relative w-28">
                  <div className="flex justify-start gap-4 items-center">
                    <p
                      title="Edit"
                      className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                    >
                      <MdOutlineEdit />
                    </p>
                    <p
                      title="Cancel"
                      className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                      onClick={() =>
                        cancelOrRescheduleAppointment(
                          appointment._id,
                          "Cancelled"
                        )
                      }
                    >
                      <MdDeleteOutline />
                    </p>
                    <p
                      title="Reschedule"
                      className="text-gray-800 text-lg hover:scale-150 duration-300 cursor-pointer bg-sky-200 p-1 rounded"
                      onClick={() =>
                        cancelOrRescheduleAppointment(
                          appointment._id,
                          "Rescheduled",
                          new Date().toISOString() // For example, reschedule to current date-time
                        )
                      }
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
