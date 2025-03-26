import React from "react";

const InfoCard = ({ card }) => {
  const { name, description, icon, bgClass } = card;
  return (
    <div
      className={` text-white p-6  md:w-62 h-48 rounded  flex flex-col justify-center items-center shadow-xl ${bgClass}`}
    >
      <div className="border-[1px] w-18 flex   justify-center items-center rounded-2xl h-18 p-4">
        <img src={icon} className="w-10" alt="Movie" />
      </div>
      <div className="text-center">
        <h2 className=" text-xl font-bold">{name}</h2>
        <p className="font-semibold">{description}</p>
      </div>
    </div>
  );
};

export default InfoCard;
