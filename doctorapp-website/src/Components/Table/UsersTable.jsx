import React, { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { IoEyeOutline } from "react-icons/io5";
import axios from "axios";
import toast from "react-hot-toast";
import UserModel from "../Modal/UserModel";
import { baseURL } from "../../utility/Api/BaseURl";
const UsersTable = ({ loading, users, error }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleting, setDeleting] = useState(false);
  // Calculate total pages
  const usersPerPage = 5;
  const totalPages = Math.ceil(users.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectedUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleView = (doctor) => {
    setSelectedUser(doctor);
    setIsModalOpen(true);
  };

  const handleDeleteDoctor = async (doctorId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this User?"
    );
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      const response = await axios.delete(`${baseURL}admin/user/${doctorId}`);

      if (response.status === 200) {
        toast.success("User deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting User:", error);
      // toast.error("Failed to delete User.");
    } finally {
      setDeleting(false);
    }
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
                <th className="p-3 border-[1px] border-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedUsers?.map((user, index) => (
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
                    {user.location}
                  </td>
                  <td className="p-3 border-[1px] border-gray-300 relative w-28">
                    <div className="flex justify-center gap-4 items-center">
                      <p
                        title="Cancel"
                        onClick={() => handleDeleteDoctor(user._id)}
                        className="text-gray-100 text-lg hover:scale-150 duration-300 cursor-pointer bg-red-400 p-1 rounded"
                      >
                        {deleting ? "Deleting..." : <MdDeleteOutline />}
                      </p>
                      <p
                        title="View details"
                        onClick={() => handleView(user)}
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

      <UserModel
        selectedUser={selectedUser}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
};

export default UsersTable;
