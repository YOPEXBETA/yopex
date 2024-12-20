import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

const SocialLinks = () => {
  const links = [
    {
      id: 1,
      child: (
        <>
          Instagram <FaInstagram size={30} />
        </>
      ),
      href: "https://www.instagram.com/yopex_official/?hl=fr",
      style: "rounded-tr-md",
    },
    {
      id: 2,
      child: (
        <>
          Facebook <FaFacebook size={30} />
        </>
      ),
      href: "https://www.facebook.com/yopexofficial",
    },
    {
      id: 3,
      child: (
        <>
          Linkedin <FaLinkedin size={30} />
        </>
      ),
      href: "https://www.linkedin.com/company/yopex/",
    },
  ];

  return (
    <div className="hidden lg:flex flex-col top-[39%] left-0 fixed">
      <ul>
        {links.map(({ id, child, href, download }) => (
          <li
            key={id}
            className={
              "flex justify-between items-center w-40 h-14 px-4 ml-[-100px] hover:ml-[-10px] hover:rounded-xl duration-300 bg-green-500"
            }
          >
            <a
              href={href}
              className="flex justify-between items-center w-full text-white"
              target="_blank"
              rel="noreferrer"
            >
              {child}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SocialLinks;
