import React, { useState } from "react";
import StartChallengeModal from "../../../../../../Components/Modals/StartChallengeModal";

const Start = ({challenge, type}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <StartChallengeModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        challenge={challenge}
        type={type}
      />
      <button
        onClick={openModal}
        className="bg-green-500 px-5 py-5 rounded-full w-full hover:bg-green-700 text-white"
      >
        Start the challenge
      </button>
    </div>
  );
};

export default Start;
