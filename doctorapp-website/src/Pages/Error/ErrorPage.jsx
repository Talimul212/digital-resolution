import React from "react";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();

  // Function to navigate back to the home page
  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div
        className="boxShadow h-[100vh] px-10 w-full md:min-h-[590px] py-16 flex flex-col justify-center "
        style={{
          background: "url('https://i.ibb.co/02DvRcV/404.jpg')",
          backgroundSize: "cover",
        }}
      >
        <h1 className="text-[2rem] sm:text-[3rem] font-[600] text-white w-full lg:w-[50%]">
          Go Home, You’re Drunk!
        </h1>

        <button
          onClick={handleGoHome}
          className="py-3 px-8 w-max rounded-full bg-[#92E3A9] hover:bg-[#4ec46f] text-white mt-5"
        >
          BACK TO HOME
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
