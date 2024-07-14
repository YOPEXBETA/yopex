import Card from "./index";
import React from "react";


function OrganizationTypeCard(props) {
    const { variant, extra, children, ...rest } = props;
    return (
        <div
            {...rest}
            className="hover:scale-105   overflow-hidden  shadow-md transition duration-300 ease-in-out
            !z-5 relative flex flex-col md:rounded-xl dark:border-zinc-700
      rounded-none border-gray-100 border-[1px] hover:shadow-lg hover:scale-102 bg-white bg-clip-border shadow-3xl
      shadow-shadow-500 dark:bg-zinc-800  dark:text-white dark:shadow-none   cursor-pointer hover:scale-102 ">
                {children}
        </div>
    );
}

export default OrganizationTypeCard;
