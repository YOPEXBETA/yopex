import React from "react";
import Card from "./index";
import ProfessionIcon from "../icons/ProfessionIcon";
import HorizontalDotsIcon from "../icons/HorizontalDotsIcon";
import Dropdown from "../dropdown";
import ProfessionMenuItem from "../MenuIcons/ProfessionMenuItem";

const ProfessionCard = ({ profession }) => {
    return (
        <div>
            <Card extra="h-40">
                <div className="p-6 space-y-4">
                    <div className="flex justify-between items-center">
                        <ProfessionIcon />
                        <Dropdown
                            button={
                                <div className="absolute right-0 top-0 bottom-0">
                                    <HorizontalDotsIcon className="cursor-pointer text-center" />
                                </div>
                            }
                            animation="origin-[65%_0%] md:origin-top-right transition-all duration-300 ease-in-out"
                            children={<ProfessionMenuItem profession={profession} />}
                            classNames={"py-2 top-4 right-0"}
                        />
                    </div>
                    <h5 className="mb-2 block font-sans text-lg font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        {profession?.name}
                    </h5>
                </div>
            </Card>
        </div>
    );
};

export default ProfessionCard;
