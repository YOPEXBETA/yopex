import React from "react";

const Contact = () => {
  return (
    <div name="contact" className="w-full  lg:px-24 md:px-11 py-10 border-b-2 ">
      <div className="pb-11 flex flex-col items-center">
        <p className="text-4xl font-bold text-center">Contact us</p>
        <p className="py-6">Submit the form below to get in touch with us</p>
      </div>

      <div className=" flex justify-center items-center">
        <form
          action="https://getform.io/f/d6dad713-620e-4b72-812e-ac22be3aaa14"
          method="POST"
          className=" flex flex-col w-full md:w-1/2"
        >
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
          />
          <input
            type="text"
            name="email"
            placeholder="Enter your email"
            className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none"
          />
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="10"
            className="p-2 bg-transparent border-2 rounded-md  focus:outline-none"
          ></textarea>

          <button className="text-white bg-green-500   cursor-pointer px-6 py-3 my-8 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
            Let's talk
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
