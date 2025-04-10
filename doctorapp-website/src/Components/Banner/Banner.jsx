import React from "react";
import chair from "../../assets/images/chair.png";
const Banner = () => {
  return (
    <div>
      <div className="hero">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img src={chair} className="rounded-lg lg:w-1/2 shadow-2xl" alt="" />
          <div>
            <h1 className="text-5xl font-bold">Box Office News!</h1>
            <p className="py-6 ">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              <br /> excepturi exercitationem quasi. In deleniti eaque aut
              repudiandae et a id nisi.
            </p>
            <button className="p-2 hover:text-gray-500 duration-200 text-white bg-[#5caff388] rounded  cursor-pointer font-bold">
              Getting Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
