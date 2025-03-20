import React from "react";

const DoctorsTable = ({ doctors, loading, error }) => {
  return (
    <div>
      {loading && <p>Loading doctors...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {doctors?.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <table className="min-w-full text-center bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="p-3 border-[1px] border-gray-300">S.No</th>
              <th className="p-3 border-[1px] border-gray-300">Name</th>
              <th className="p-3 border-[1px] border-gray-300">Specialty</th>
              <th className="p-3 border-[1px] border-gray-300">Contact</th>
              <th className="p-3 border-[1px] border-gray-300">Gender</th>
              <th className="p-3 border-[1px] border-gray-300">Address</th>
            </tr>
          </thead>
          <tbody>
            {doctors?.map((doctor, index) => (
              <tr key={doctor._id}>
                <td className="p-3 border-[1px] border-gray-300">
                  {index + 1}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctor.name}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctor.specialty}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctor.contact}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctor.gender}
                </td>
                <td className="p-3 border-[1px] border-gray-300">
                  {doctor.address}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorsTable;
