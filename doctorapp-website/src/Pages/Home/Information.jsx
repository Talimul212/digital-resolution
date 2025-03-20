import React from "react";
import quote from "../../assets/icons/quote.svg";
import clock from "../../assets/icons/clock.svg";
import marker from "../../assets/icons/marker.svg";
import phone from "../../assets/icons/phone.svg";
import InfoCard from "../../Components/Card/InfoCard";
const Information = () => {
  const infoData = [
    {
      id: 1,
      name: "Opening Hours",
      description: "Open 9.00 am to 5.00pm everyday",
      icon: clock,
      bgClass: "bg-gradient-to-r from-[#5caff388] to-accent",
    },
    {
      id: 2,
      name: "Our Locations",
      description: "Open 9.00 am to 5.00pm everyday",
      icon: marker,
      bgClass: "bg-accent",
    },
    {
      id: 3,
      name: "Contact Us",
      description: "Open 9.00 am to 5.00pm everyday",
      icon: phone,
      bgClass: "bg-gradient-to-r from-accent to-[#5caff388] ",
    },
  ];

  return (
    <div className="flex justify-center mt-18">
      <img className="w-24 hidden md:block md:w-30 me-24" src={quote} alt="" />
      <div className="flex flex-wrap gap-3 justify-center">
        {infoData.map((card) => (
          <InfoCard key={card.id} card={card} />
        ))}
      </div>
      <img
        className="w-24 md:w-30 ms-24 hidden rotate-180 md:block"
        src={quote}
        alt=""
      />
    </div>
  );
};

export default Information;
