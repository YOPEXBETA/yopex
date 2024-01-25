import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  edit,
  reset,
  editProfileLinks,
} from "../../../../../redux/auth/authSlice";
import SocialMediaLinks from "../Links/components/SocialMediaLinks";
import Card from "../../../../../Components/Cards";

const Links = ({ extra }) => {
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
    <Card extra={`p-8 ${extra}`}>
      <div className="">
        <div className="space-y-6">
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

      <div className="grid grid-cols-1 mt-10">
        <div className="col-span-1 flex justify-end">
          <button
            className={`${"bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80"} text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-28`}
            type="button"
            onClick={editProfileLinksMutation}
          >
            Save
          </button>
        </div>
      </div>
    </Card>
  );
};

export default Links;
