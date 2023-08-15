import React from "react";

const Contact = () => {
  return (
    <div
      name="contact"
      className="bg-black w-full text-white lg:px-24 md:px-11 py-10 "
    >
      <div className="pb-11">
        <p className="text-4xl font-bold text-center">Contact us</p>
      </div>

      {/* Using grid logic directly */}
      <div className="grid sm:grid-cols-2 md:grid-cols-2 gap-8 px-12 sm:px-0 pb-16 lg:grid-cols-2">
        <div className="border-solid border-green-500 border rounded-md shadow-md hover:scale-105 duration-500 hover:shadow-green-500 overflow-hidden hidden sm:hidden lg:block">
          <div className="bg- rounded-md p-4 h-72 flex flex-col items-center gap-5">
            <div></div>
          </div>
        </div>

        <div>
          <form
            action="https://getform.io/f/d6dad713-620e-4b72-812e-ac22be3aaa14"
            method="POST"
            className="flex flex-col w-full"
          >
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              className="p-2 bg-transparent border-2 rounded-md text-white focus:outline-none border-white hover:border-green-500 hover:scale-105 duration-500"
            />
            <input
              type="text"
              name="email"
              placeholder="Enter your email"
              className="my-4 p-2 bg-transparent border-2 rounded-md text-white focus:outline-none border-white hover:border-green-500 hover:scale-105 duration-500"
            />
            <textarea
              name="message"
              placeholder="Enter your message"
              rows="10"
              className="p-2 h-72 bg-transparent border-2 rounded-md text-white focus:outline-none border-white hover:border-green-500 hover:scale-105 duration-500"
            ></textarea>

            <button className="text-white bg-gradient-to-r from-green-500   cursor-pointer px-6 py-3 my-6 mx-auto flex items-center rounded-md hover:scale-110 duration-300">
              Let's talk
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
