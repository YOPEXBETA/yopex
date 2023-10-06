import React from "react";

const SocialPostImage = ({ item, height, width, openModal, type }) => {
  return (
    <div>
      <div key={item} onClick={() => openModal(item)}>
        {type === "feed" ? (
          <img
            alt="photo"
            src={item}
            className="w-screen h-auto  max-h-[456px]  xl:w-[60rem]  object-cover  "
          />
        ) : (
          <img
            alt="photo"
            src={item}
            className={`max-w-[calc(100% - 0.5rem)] xl:h-${height} xl:w-${width} h-full object-cover`}
          />
        )}
      </div>
    </div>
  );
};

export default SocialPostImage;
