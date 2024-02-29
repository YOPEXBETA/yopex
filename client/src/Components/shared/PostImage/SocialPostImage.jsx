import React from "react";

const SocialPostImage = ({ item, height, width, openModal, type }) => {
  return (
    <div>
      <div key={item} onClick={() => openModal(item)}>
        {type === "feed" ? (
          <img
            alt="photo"
            src={item}
            className="w-screen xl:w-[60rem] min-h-96 h-full object-cover rounded-t-2xl  divide-gray-100 dark:divide-gray-700 overflow-hidden md:border-gray-300 text-gray-600 dark:border-gray-700"
          />
        ) : (
          <img
            alt="photo"
            src={item}
            className={`max-w-[calc(100% - 0.5rem)] xl:h-${height} xl:w-${width} h-full object-cover  divide-gray-100 dark:divide-gray-700 overflow-hidden md:border-gray-300 text-gray-600 dark:border-gray-700`}
          />
        )}
      </div>
    </div>
  );
};

export default SocialPostImage;
