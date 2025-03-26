import React from "react";
import Banner from "../../Components/Banner/Banner";
import Information from "./Information";
import ServiceSection from "./ServiceSection";
import Appointment from "./Appointment";
import Testimonial from "./Testimonial";

const HomeList = () => {
  return (
    <div>
      {/* <marquee behavior="" direction="">
        <div className="flex justify-between">
          <div className=" shadow rounded p-2 border-[1px] text-xl border-gray-200">
            ESEFA
          </div>
          <div className=" shadow rounded p-2 border-[1px] text-xl border-gray-200">
            ESEFA
          </div>
          <div className=" shadow rounded p-2 border-[1px] text-xl border-gray-200">
            ESEFA
          </div>
          <div className=" shadow rounded p-2 border-[1px] text-xl border-gray-200">
            ESEFA
          </div>
        </div>
      </marquee> */}
      <Banner />
      <Information />
      <ServiceSection />
      <Appointment />
      <Testimonial />
    </div>
  );
};

export default HomeList;
