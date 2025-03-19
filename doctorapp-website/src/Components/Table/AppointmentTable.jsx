import React from "react";
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
const AppointmentTable = ({ appointments, doctorDetails }) => {
  return (
    <div>
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
                      className="text-gray-100 text-lg hover:scale-50 duration-300 cursor-pointer bg-green-400 p-1 rounded"
                    >
                      <MdOutlineEdit />
                    </p>
                    <p
                      title="Cancel"
                      className="text-gray-100 text-lg hover:scale-50 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                    >
                      <MdDeleteOutline />
                    </p>
                    <p
                      title="Reschedule"
                      className="text-gray-800 text-lg hover:scale-50 duration-300 cursor-pointer bg-sky-200 p-1 rounded"
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
