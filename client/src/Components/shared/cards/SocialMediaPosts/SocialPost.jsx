import { Favorite, FavoriteBorder, Share } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { formatDistance } from "date-fns";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CommentButton from "../../comments/CommentButton";
import {
  useLikePost,
  useSharePost,
} from "../../../../hooks/react-query/usePosts";
import PostMenuIcon from "./components/PostMenuIcon";

const SocialPostCard = ({ post }) => {
  const { user } = useSelector((state) => state.auth);
  const { category } = useSelector((state) => state.global);

  const { mutate: likePost } = useLikePost(user._id, post.userId, category);
  const { mutate: sharePost } = useSharePost(user._id, post.userId, category);

  return (
    <div className="bg-white w-full mx-auto h-full rounded-lg border-green-500 border-b-2">
      <div className=" flex justify-between items-start">
        <div className=" flex items-center gap-3 py-6 px-4">
          <img
            alt="post"
            src={post.userPicturePath}
            className=" w-11 h-11 rounded-full object-cover bg-green-500"
          />
          <div>
            <Link
              key={post.userId._id}
              to={`/profile/${post.userId._id}`}
              style={{ textDecoration: "none", color: "#000000" }}
            >
              <p className="text-md font-medium ">
                {`${post.userId.firstname} ${post.userId.lastname}`}
              </p>
            </Link>
            <p className=" text-[14px]  text-gray-500">
              {formatDistance(new Date(post.createdAt), new Date(), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
        {post.userId === user._id && (
          <button className="p-2 rounded-full">
            <PostMenuIcon className="text-black" post={post} />
          </button>
        )}
      </div>

      <div className="px-4 pb-3 ">
        <p>{post.description}</p>
      </div>

      {post.postPicturePath.map((item) => (
        <button key={item}>
          <img alt="photo" src={item} />
        </button>
      ))}

      <div className=" flex items-center py-1 gap-2">
        {/* Like button */}
        <div className="flex items-center gap-1">
          <button
            aria-label="add to favorites"
            onClick={() => likePost(post._id)}
          >
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite sx={{ color: "red" }} />}
              checked={user._id in post.likes}
            />
          </button>
          <p className="">{post.likesCount}</p>
        </div>

        {/* Comment button */}
        <div className=" flex items-center gap-1">
          <CommentButton post={post} category={category} />
          <p className="">{post.commentCount}</p>
        </div>

        {/* Share button */}
        <div className=" flex items-center gap-1">
          <button onClick={() => sharePost(post._id)}>
            <Share sx={{ color: "silver" }} />
          </button>
          <p className="">{post.shareCount}</p>
        </div>
      </div>
    </div>
  );
};

export default SocialPostCard;
