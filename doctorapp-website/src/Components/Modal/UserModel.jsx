import React from "react";
import { RxCross1 } from "react-icons/rx";
const UserModel = ({ isModalOpen, selectedUser, setIsModalOpen }) => {
  return (
    <div>
      <div
        className={`${
          isModalOpen ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
        } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] flex items-center justify-center transition-all duration-300`}
      >
        <div className="w-[90%] md:w-[30%] bg-white rounded-lg p-4">
          <div className="w-full flex justify-between">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Approve the Doctor Registration
              </h2>
              <p className="mb-2">
                <strong>Name:</strong> {selectedUser?.name}
              </p>
              <p className="mb-2">
                <strong>User Email:</strong> {selectedUser?.email}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {selectedUser?.role}
              </p>
              <p className="mb-2">
                <strong>Gender :</strong> {selectedUser?.role}
              </p>
              <p className="mb-2">
                <strong>User Address:</strong> {selectedUser?.role}
              </p>
              <p className="mb-2">
                <strong>User Role:</strong> {selectedUser?.role}
              </p>
            </div>

            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModel;
