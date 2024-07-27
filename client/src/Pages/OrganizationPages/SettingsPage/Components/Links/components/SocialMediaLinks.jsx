import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaTwitter,
    FaLinkedin,
    FaTimes,
} from "react-icons/fa";
import LinkIcon from "../../../../../../Components/icons/LinkIcon";

const SocialMediaLinks = ({
                              label,
                              showInput,
                              inputValue,
                              setInputValue,
                              toggleInput,
                          }) => {
    // Map the label to the corresponding icon
    const iconMapping = {
        Facebook: <FaFacebook />,
        Instagram: <FaInstagram />,
        Twitter: <FaTwitter />,
        Linkedin: <FaLinkedin />,
    };

    // Get the icon based on the label
    const icon = iconMapping[label] || null;

    return (
        <div className="grid grid-cols-1">
            <div className="col-span-1">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <label className="bg-zinc-800 p-2 rounded-full text-white dark:border-2">
                            {icon}
                        </label>
                        <label className="dark:text-gray-300">{label}</label>
                    </div>
                    {showInput ? (
                        <button
                            type="button"
                            className="text-red-500 hover:text-red-700"
                            onClick={toggleInput}
                        >
                            <FaTimes />
                        </button>
                    ) : (
                        <button
                            type="button"
                            className="bg-black p-2 rounded-full text-sm font-medium text-white"
                            onClick={toggleInput}
                        >
                            <LinkIcon />
                        </button>
                    )}
                </div>
                {showInput && (
                    <input
                        type="text"
                        value={inputValue}
                        placeholder={`${label.toLowerCase()} url : https://${label.toLowerCase()}.com/..`}
                        className="w-full border dark:bg-zinc-700 dark:border-zinc-600 dark:text-gray-300 border-gray-300 rounded-md px-3 py-2 mt-1 resize-none bg-gray-50"
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default SocialMediaLinks;
