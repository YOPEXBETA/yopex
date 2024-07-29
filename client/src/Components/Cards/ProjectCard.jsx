import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useState } from "react";
import { Link } from "react-router-dom";
import AvatarProfile from "../../assets/images/AvatarProfile.jpg";
import Card from "./index";

const ProjectCard = ({ title, author, price, image, bidders, post, extra }) => {
  const [heart, setHeart] = useState(true);
  return (
    <Card
      extra={`flex flex-col w-full h-full !p-4 3xl:p-![18px] bg-white ${extra}`}
    >
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src={post.postPicturePath}
            className="mb-3 h-full md:h-48 object-cover w-full rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          <button
            onClick={() => setHeart(!heart)}
            className="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer"
          >
            <div className="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50 dark:text-gray-900">
              {heart ? (
                <IoHeartOutline />
              ) : (
                <IoHeart className="text-brand-500" />
              )}
            </div>
          </button>
        </div>

        <div className="mb-2 px-1">
          <p className="text-lg font-bold text-gray-700 dark:text-white">
            Sample Project Title
          </p>
        </div>
        <div className="flex items-center justify-between px-1 md:flex-col md:items-start lg:flex-row lg:justify-between xl:flex-col xl:items-start 3xl:flex-row 3xl:justify-between">
          <div className=" flex items-center  gap-2">
            {post.userPicturePath ? (
              <img
                alt="post"
                src={post.userPicturePath}
                className="w-8 h-8 rounded-full object-cover bg-white border-2"
              />
            ) : (
              <img
                alt="default"
                src={AvatarProfile}
                className="w-8 h-8 rounded-full object-cover bg-white border-2"
              />
            )}
            <div>
              <Link
                key={post.userId}
                to={
                  post?.companyName !== undefined
                    ? `/organization/${post.userId}`
                    : `/profile/${post.userId}`
                }
                style={{ textDecoration: "none", color: "#000000" }}
              >
                <p className="text-md font-medium dark:text-gray-300 truncate w-52">
                  {post.companyName !== undefined
                    ? `${post?.companyName}`
                    : `${post?.firstname} ${post?.lastname}`}
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProjectCard;
