import React from "react";

const ServiceCard = ({ service }) => {
  const { name, description, img } = service;
  return (
    <div className="card bg-base-100 shadow-xl   border-[1px] border-amber-100">
      <figure className="px-10 pt-10">
        <img src={img} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{name}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
