import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  useChallengeById,
  useChooseWinner,
  useUserSubmission,
} from "../../../../../../hooks/react-query/useChallenges";

const ChooseWinner = () => {
  const [selectedUser, setSelectedUser] = useState("");
  const myData = JSON.parse(localStorage.getItem("user"));

  const { id } = useParams();
  const { data } = useChallengeById(id);
  const { mutate: chooseWinner } = useChooseWinner();

  const handleSubmit = async () => {
    const companyId = data.company._id;
    const winnerId = selectedUser;

    chooseWinner({ idChallenge: id, idCompany: companyId, idUser: winnerId });

    window.location.reload();
  };

  return (
    <div className="w-1/2 mx-auto space-y-5">
      <div className="space-y-3">
        <label
          htmlFor="demo-simple-select-label"
          className="text-sm font-semibold"
        >
          Select an Option
        </label>

        <select
          id="demo-simple-select"
          value={selectedUser}
          onChange={(event) => setSelectedUser(event.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-green-500"
        >
          <option value="" disabled>
            Select an Option
          </option>
          {data?.users.map((user) => (
            <option value={user.user._id} key={user._id}>
              {`${user.user.firstname} ${user.user.lastname}`}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-1">
        {/* Add content for Stack direction="row" here if needed */}
      </div>

      <button
        className="w-full py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-500"
        type="button"
        onClick={handleSubmit}
      >
        Verify !
      </button>
    </div>
  );
};

export default ChooseWinner;
