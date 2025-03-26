import React from "react";
import ContactForm from "../../Components/Form/Contactform/Contactform";
import UseTitle from "../../utility/hook/UseTitle";

const Contact = () => {
  UseTitle("Contact");
  return (
    <>
      <h1 className="text-center font-bold text-3xl">Contact Us</h1>
      <div className="lg:grid grid-cols-12 my-12 lg:mx-10 card-bordered  rounded-xl  mx-2 ">
        <div className=" col-span-6 ">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/gadgets-for-sale-design-template-f8cba3fdce0b80db63b4bfa6a244dbe4_screen.jpg?ts=1652084504"
            alt=""
            className="h-full"
          />
        </div>
        <div className=" flex items-center justify-center col-span-6 lg:mr-[20px]">
          <div className="divider lg:flex hidden lg:divider-horizontal"></div>
          <div className="w-full bg-white p-5">
            <p className="md:text-3xl text-xl font-bold leading-7 text-center text-gray-700">
              Send Us a Message
            </p>
            <ContactForm></ContactForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
