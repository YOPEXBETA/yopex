import React from "react";

const Copyright = (props) => {
  return (
    <div>
      <p className="text-gray-400 text-center" {...props}>
        {"Copyright © "}
        <a color="inherit">YOPEX</a> {new Date().getFullYear()}
        {"."}
      </p>
    </div>
  );
};

export default Copyright;
