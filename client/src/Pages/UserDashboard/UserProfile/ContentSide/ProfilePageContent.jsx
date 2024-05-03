import React from "react";
import FeedbacksPage from "./Components/FeedBacks/feedbacks";
import Followers from "./Components/Followers/Followers";
import Followings from "./Components/Followings/Followings";
import MyChallenges from "./Components/MyChallenges/MyChallenges";
import Bookmarks from "./Components/Bookmarks/bookmarks";
import UserProfileInformations from "./Components/UserInformations/UserProfileInformations";
import BadgesPage from "./Components/Badges/BadgesPage";
import MyPosts from "./Components/MyPosts/MyPosts";

const ProfilePageContent = ({ changeValue, value }) => {
  return (
    <div>
      {value === 0 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full pb-16 md:pb-4 ">
            <MyPosts />
          </div>
        </div>
      )}
      {value === 1 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <MyChallenges />
          </div>
        </div>
      )}
      {value === 2 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <Followers />
          </div>
        </div>
      )}

      {value === 3 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <Followings />
          </div>
        </div>
      )}

      {value === 4 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <BadgesPage />
          </div>
        </div>
      )}

      {value === 5 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <FeedbacksPage />
          </div>
        </div>
      )}

      {value === 6 && (
        <div className="flex justify-center">
          <div className="w-full lg:w-12/12 md:w-12/12 xs:w-full  pb-16 md:pb-4">
            <Bookmarks />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageContent;
