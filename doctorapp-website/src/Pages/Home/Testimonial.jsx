import React from "react";
import quote from "../../assets/icons/quote.svg";
import people1 from "../../assets/images/people1.png";
import people3 from "../../assets/images/people3.png";
import people2 from "../../assets/images/people2.png";
import TestimonialCard from "../../Components/Card/TestimonialCard";
const Testimonial = () => {
  const reviews = [
    {
      _id: 1,
      name: "Winson Herry",
      img: people1,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
    {
      _id: 2,
      name: "Winson Herry",
      img: people2,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
    {
      _id: 3,
      name: "Winson Herry",
      img: people3,
      review:
        "It is a long established fact that by the readable content of a lot layout. The point of using Lorem a more-or-less normal distribu to using Content here, content",
      location: "California",
    },
  ];
  return (
    <section className="my-16 mx-2">
      <div className="flex justify-center">
        <figure>
          <img className=" md:w-20 me-24 hidden  md:block" src={quote} alt="" />
        </figure>
        <div className="text-center">
          <h4 className="text-xl text-black font-bold">Testimonial</h4>
          <h2 className="text-4xl text-center">What Our Patients Says</h2>
        </div>
        <figure>
          <img
            className="md:w-20 ms-24 hidden rotate-180 md:block"
            src={quote}
            alt=""
          />
        </figure>
      </div>
      <div className="grid mt-3 gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <TestimonialCard key={review._id} review={review}></TestimonialCard>
        ))}
      </div>
    </section>
  );
};

export default Testimonial;
