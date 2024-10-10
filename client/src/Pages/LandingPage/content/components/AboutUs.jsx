import React from "react";
import HultEventPic from "../../../../assets/images/HultEventPic.jpeg";

const AboutUs = () => {
  return (
    <div>
      <section className="py-24 relative">
        <div className="w-full max-w-7xl px-4 md:px-6 lg:px-8 mx-auto">
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-12">
            <div className="flex flex-col justify-center items-start text-left">
              <h2 className="text-4xl font-bold font-manrope text-gray-800 dark:text-white mb-6">
                About Us
              </h2>
              <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed 
               leading-7 md:leading-8">
              Yopex is a talent hub platform that hosts a vibrant community of youth dedicated to solving the world’s most pressing challenges.<br />
              We connect talented young individuals with organizations, providing opportunities to learn, develop skills, and find jobs.<br />
              Our mission is to transform the African continent and showcase local talent to the world while bridging the gap between job seekers and innovative startups.
              </p>
            </div>
            <div className="flex justify-center items-start">
              <div className="relative w-full max-w-lg">
                <img className="w-full h-full rounded-3xl object-cover shadow-lg" src={HultEventPic} alt="About Us" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
