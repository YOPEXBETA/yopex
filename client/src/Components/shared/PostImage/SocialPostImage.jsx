import React from "react";

const SocialPostImage = ({ item, height, width, openModal }) => {

  return (
    <div >
      <div key={item} onClick={() => openModal(item)}>
        <img
          alt="photo"
          src={item}
          className={`max-w-[calc(100% - 0.5rem)] xl:h-${height} xl:w-${width} h-full w-screen  `}
        />
      </div>
    </div>
  );
};

export default SocialPostImage;
