import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../../utility/Api/BaseURl";
import axios from "axios";
import toast from "react-hot-toast";
const PatientModel = ({
  setIsModalOpen,
  isModalOpen,
  selectedDoctor,
  fetchAppointments,
}) => {
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    if (!selectedDoctor) return;

    try {
      setLoading(true);
      const response = await axios.put(
        `${baseURL}patient/status/${selectedDoctor._id}`
      );

      if (response.status === 200) {
        toast.success("Patient Appointment Booked!");
        window.location.reload();
        fetchAppointments(); // Refresh doctor list
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("Error booking Appointment:", error);
      toast.error("Failed to booked Appointment.");
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
                <strong>Description:</strong> {selectedDoctor?.address}
              </p>
              <p className="mb-2">
                <strong>Specialty:</strong> {selectedDoctor?.gender}
              </p>
              <p className="mb-2">
                <strong>Contact:</strong> {selectedDoctor?.contact}
              </p>
              <p className="mb-2">
                <strong>Status:</strong>
                <span className="bg-green-400 px-2 ms-2 text-white py-1 rounded">
                  {selectedDoctor?.status}
                </span>
              </p>
            </div>

            <RxCross1
              className="p-2 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(false)}
            />
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-6">
            {selectedDoctor?.status === "pending" && (
              <button
                className="mt-5 font-bold bg-[#5caff388] text-white px-4 hover:text-gray-500 py-2 rounded duration-200"
                onClick={handleApprove}
                disabled={loading}
              >
                {loading ? "Booking..." : "Booked"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModel;
