import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import axios from "axios"; // Import axios for API call
import { baseURL } from "../../utility/Api/BaseURl";
import toast from "react-hot-toast";

const DoctorModal = ({
  setIsModalOpen,
  isModalOpen,
  selectedDoctor,
  refreshDoctors,
}) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!selectedDoctor) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${baseURL}admin/doctors/${selectedDoctor._id}`
      );

      if (response.status === 200) {
        toast.success("Doctor registration approved!");
        refreshDoctors(); // Refresh doctor list
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error approving registration:", error);
      toast.error("Failed to approve registration.");
    } finally {
      setLoading(false);
    }
  };

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
                <strong>Name:</strong> {selectedDoctor?.name}
              </p>
              <p className="mb-2">
                <strong>Specialty:</strong> {selectedDoctor?.specialty}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {selectedDoctor?.contact}
              </p>
              <p className="mb-2">
                <strong>Registrations:</strong>
                <span className="bg-green-400 px-2 ms-2 text-white py-1 rounded">
                  {selectedDoctor?.registrations}
                </span>
              </p>
            </div>

            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-6">
            {!selectedDoctor?.registrations === "Approve" && (
              <button
                className="mt-5 font-bold bg-[#5caff388] text-white px-4 hover:text-gray-500 py-2 rounded duration-200"
                onClick={handleApprove}
                disabled={loading}
              >
                {loading ? "Approving..." : "Approve"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorModal;
