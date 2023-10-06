import React from "react";

const SocialPostImage = ({ item, height, width, openModal, type }) => {
  return (
    <div>
      <div key={item} onClick={() => openModal(item)}>
        {type === "feed" ? (
          <img
            alt="photo"
            src={item}
            style={{
              width: "623px",
              height: "456px",
              maxHeight: "456px",
              maxWidth: "623px",
            }}
            className={`max-w-[calc(100% - 0.5rem)] xl:h-${height} xl:w-${width} `}
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
