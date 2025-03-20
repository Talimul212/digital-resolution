import React, { useState } from "react";

const UsersTable = ({ loading, users, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Slice the users array to get only the users for the current page
  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {loading && <p>Loading users...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {users?.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <>
          <table className="min-w-full text-center bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="p-3 border-[1px] border-gray-300">S.No</th>
                <th className="p-3 border-[1px] border-gray-300">Name</th>
                <th className="p-3 border-[1px] border-gray-300">Email</th>
                <th className="p-3 border-[1px] border-gray-300">Role</th>
                <th className="p-3 border-[1px] border-gray-300">Contact</th>
                <th className="p-3 border-[1px] border-gray-300">Gender</th>
                <th className="p-3 border-[1px] border-gray-300">Address</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers.map((user, index) => (
                <tr key={user._id}>
                  <td className="p-3 border-[1px] border-gray-300">
                    {startIndex + index + 1}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.name}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.email}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.role}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.contact}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.gender}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300">
                    {user.address}
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
  );
};

export default UsersTable;
