import React, { useState } from "react";
import Card from "./index";
import CategoryIcon from "../icons/CategoryIcon";
import HorizontalDotsIcon from "../icons/HorizontalDotsIcon";
import Dropdown from "../dropdown";
import CategoryMenuItem from "../MenuIcons/CategoryMenuItem";

const CategoryCard = ({ category, extra }) => {
  return (
    <div>
      <Card extra={`${extra} h-40`}>
        <div className="p-6 space-y-4">
          <div className="flex justify-between items-center">
            <CategoryIcon width={10} height={10} color="green" />
            <Dropdown
              button={
                <div className="absolute right-0 top-0 bottom-0">
                  <HorizontalDotsIcon className="cursor-pointer text-center" />
                </div>
              }
              animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
              children={<CategoryMenuItem category={category} />}
              classNames={"py-2 top-4 right-0"}
            />
          </div>
          <h5 className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {category?.name}
          </h5>
        </div>
      </Card>
    </div>
  );
};

export default CategoryCard;
