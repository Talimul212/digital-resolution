import React from "react";
// import { useForm } from "react-hook-form";

const ContactForm = () => {
  // const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="md:flex items-center mt-12">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Name
            </label>
            <input
              type="text"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              //   {...register("name", {
              //     required: true,
              //   })}
            />
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              // {...register("email", {
              //   pattern: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
              // })}
            />
          </div>
        </div>
        <div className="md:flex items-center mt-8">
          <div className="md:w-72 flex flex-col">
            <label className="text-base font-semibold leading-none text-gray-800">
              Phone No
            </label>
            <input
              type="number"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 "
              // {...register("telephone", {
              //   required: true,
              //   pattern: /^01[3-9]\d{8}$/,
              // })}
            />
          </div>
          <div className="md:w-72 flex flex-col md:ml-6 md:mt-0 mt-4">
            <label className="text-base font-semibold leading-none text-gray-800">
              Country
            </label>
            <input
              type="country"
              className="text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100"
              // {...register("country_name")}
            />
          </div>
        </div>
        <div>
          <div className="w-full flex flex-col mt-8">
            <label className="text-base font-semibold leading-none text-gray-800">
              Message
            </label>
            <textarea
              role="textbox"
              type="text"
              className="h-36 text-base leading-none text-gray-900 p-3 focus:oultine-none focus:border-indigo-700 mt-4 bg-gray-100 border rounded border-gray-200 placeholder-gray-100 resize-none"
              // {...register(" message", {
              //   required: true,
              // })}
            />
          </div>
        </div>
        <p className="text-xs leading-3 text-gray-600 mt-4">
          By clicking submit you agree to our terms of service, privacy policy
          and how we use data as stated
        </p>
        <div className="flex items-center justify-center w-full">
          <button className="mt-9 text-base font-semibold leading-none text-white py-4 px-10  rounded  bg-gradient-to-r from-primary  to-secondary focus:outline-none">
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
