import React, { useState } from "react";
import FeedbacksPage from "./Components/FeedBacks/feedbacks";
import Followers from "./Components/Followers/Followers";
import Followings from "./Components/Followings/Followings";
import MyChallenges from "./Components/MyChallenges/MyChallenges";
import MySocialPosts from "./Components/MyPosts/MySocialPosts";
import Bookmarks from "./Components/Bookmarks/bookmarks";
import SocialPostModal from "../../../../Components/shared/Modals/SocialPostModal";

const ProfilePageContent = ({ changeValue, value }) => {
  return (
    <div>
      {value === 0 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <MySocialPosts />
          </div>
        </div>
      )}
      {value === 1 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <MyChallenges />
          </div>
        </div>
      )}
      {value === 2 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <Followers />
          </div>
        </div>
      )}

      {value === 3 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <Followings />
          </div>
        </div>
      )}

      {value === 4 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <FeedbacksPage />
          </div>
        </div>
      )}

      {value === 5 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full">
            <Bookmarks />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageContent;
