import React from 'react'

const SocialPostImage = ({item,height,width}) => {

    return (
    <div key={item}>
        <img
        alt="photo"
        src={item}
        className={`max-w-[calc(100% - 0.5rem)] h-${height} w-${width} object-cover`}
        />
    </div>
  )
}

export default SocialPostImage