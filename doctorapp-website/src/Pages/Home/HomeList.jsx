import React from "react";
import Banner from "../../Components/Banner/Banner";
import Information from "./Information";
import ServiceSection from "./ServiceSection";
import Appointment from "./Appointment";
import Testimonial from "./Testimonial";

const HomeList = () => {
  return (
    <div>
      <Banner />
      <Information />
      <ServiceSection />
      <Appointment />
      <Testimonial />
    </div>
  );
};

export default HomeList;
