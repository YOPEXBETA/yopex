import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  edit,
  reset,
  editProfileLinks,
} from "../../../../../redux/auth/authSlice";
import SocialMediaLinks from "../Links/components/SocialMediaLinks";

const Links = () => {
  const { user, error, loading, success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [github, setGithub] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "github")?.url ||
      ""
  );
  const [linkedin, setLinkedin] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "linkedin")?.url ||
      ""
  );
  const [behance, setBehance] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "behance")?.url ||
      ""
  );
  const [dribbble, setDribbble] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "dribbble")?.url ||
      ""
  );
  const [instagram, setInstagram] = useState(
    user?.socialMediaLinks?.find((link) => link.platform === "instagram")
      ?.url || ""
  );
  const [showGithubInput, setShowGithubInput] = useState(github != "");
  const [showLinkedinInput, setShowLinkedinInput] = useState(linkedin != "");
  const [showBehanceInput, setShowBehanceInput] = useState(behance != "");
  const [showDribbbleInput, setShowDribbbleInput] = useState(dribbble != "");
  const [showInstagramInput, setShowInstagramInput] = useState(instagram != "");

  const editProfileLinksMutation = () => {
    dispatch(
      editProfileLinks({
        socialmedialinks: [
          { platform: "github", url: github },
          { platform: "linkedin", url: linkedin },
          { platform: "behance", url: behance },
          { platform: "dribbble", url: dribbble },
          { platform: "instagram", url: instagram },
        ],
      })
    );
  };
  return (
    <div>
      <div className="py-4">
        <div className="space-y-6">
          <p className="dark:text-white uppercase font-bold">
            social media links
          </p>

          <SocialMediaLinks
            label="Github"
            showInput={showGithubInput}
            inputValue={github}
            setInputValue={setGithub}
            toggleInput={() => setShowGithubInput(!showGithubInput)}
          />

          <SocialMediaLinks
            label="Linkedin"
            showInput={showLinkedinInput}
            inputValue={linkedin}
            setInputValue={setLinkedin}
            toggleInput={() => setShowLinkedinInput(!showLinkedinInput)}
          />

          <SocialMediaLinks
            label="Behance"
            showInput={showBehanceInput}
            inputValue={behance}
            setInputValue={setBehance}
            toggleInput={() => setShowBehanceInput(!showBehanceInput)}
          />

          <SocialMediaLinks
            label="Dribbble"
            showInput={showDribbbleInput}
            inputValue={dribbble}
            setInputValue={setDribbble}
            toggleInput={() => setShowDribbbleInput(!showDribbbleInput)}
          />

          <SocialMediaLinks
            label="Instagram"
            showInput={showInstagramInput}
            inputValue={instagram}
            setInputValue={setInstagram}
            toggleInput={() => setShowInstagramInput(!showInstagramInput)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 my-5">
        <div className="col-span-1">
          <button
            className={`${"bg-green-500 dark:hover:bg-green-600 hover:bg-green-600"} px-4 py-2 rounded-lg text-white w-40`}
            type="button"
            onClick={editProfileLinksMutation}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Links;