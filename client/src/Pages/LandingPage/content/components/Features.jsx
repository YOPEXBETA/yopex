import React from "react";
import { FaBriefcase } from "react-icons/fa";
import { RiLightbulbLine } from "react-icons/ri";
import { AiOutlineFileText } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

const Features = () => {
  return (
    <div>
      <div id="features">
        <div className="max-w-7xl mx-auto px-6 md:px-12 xl:px-6">
          <div className="md:w-2/3 lg:w-1/2">
            <h2 className="my-8 text-2xl font-bold text-gray-700 dark:text-white md:text-4xl">
              A social media platform designed exclusively for connecting
              freelancers with startups.
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover the powerful features that set our platform apart,
              empowering freelancers and startups to connect, collaborate, and
              succeed. Explore the tools that make your freelance journey
              smoother and help startups find the talent they need.
            </p>
          </div>
          <div className="mt-16 grid divide-x divide-y divide-gray-100 dark:divide-gray-700 overflow-hidden rounded-3xl border border-gray-100 text-gray-600 dark:border-gray-700 sm:grid-cols-2 lg:grid-cols-4 lg:divide-y-0 xl:grid-cols-4">
            <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">
                <FaBriefcase className="w-10 h-10" />

                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Apply To Jobs
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    Apply to job postings and advance your career
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">
                <RiLightbulbLine className="w-10 h-10" />

                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Challenge yourself{" "}
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    Participate in freelance challenges to showcase your skill
                    and get experience points
                  </p>
                </div>

                <a
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8">
                <AiOutlineFileText className="w-10 h-10" />

                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Automatic Resume Build
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    The platform build your resume, showcasing your achievements
                    and experiences seamlessly
                  </p>
                </div>

                <a
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div className="group relative bg-gray-50 dark:bg-gray-900 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
              <div className="relative space-y-8 py-12 p-8 transition duration-300 group-hover:bg-white dark:group-hover:bg-gray-800">
                <FiUsers className="w-10 h-10" />

                <div className="space-y-2">
                  <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
                    Connect With Freelancers
                  </h5>
                  <p className="text-gray-600 dark:text-gray-300">
                    Connect with other freelancers in your industry
                  </p>
                </div>
                <a
                  href="#"
                  className="flex items-center justify-between group-hover:text-secondary"
                >
                  <span className="text-sm">Read more</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5 -translate-x-4 text-2xl opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M12.97 3.97a.75.75 0 011.06 0l7.5 7.5a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 11-1.06-1.06l6.22-6.22H3a.75.75 0 010-1.5h16.19l-6.22-6.22a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
