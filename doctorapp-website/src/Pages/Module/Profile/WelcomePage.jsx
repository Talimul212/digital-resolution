import React from "react";

const WelcomePage = () => {
  return (
    <div className="flex justify-center font-bold text-4xl absolute  right-[13%] tracking-[.25em] top-[50%] items-center">
      <p>
        Welcome to{" "}
        <span className="font-bold  text-[#5caff388] shadow rounded me-2 border-[1px] p-1">
          {" "}
          ESEFA{" "}
        </span>{" "}
      </p>
      <br />
      <p> Dashboard Panel</p>
    </div>
  );
};

export default WelcomePage;
