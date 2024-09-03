import { useState } from "react";
import { useChooseWinner } from "../../../../../../hooks/react-query/useChallenges";
import { useChooseWinningTeam } from "../../../../../../hooks/react-query/useTeamChallenge";

const ChooseWinner = ({ challenge, type }) => {
    const [selectedOption, setSelectedOption] = useState("");
    console.log('Challenge Data:', challenge);
    console.log('Teams Array:', challenge?.teams);
    // Initialize both hooks
    const { mutate: chooseWinner } = useChooseWinner();
    const { mutate: chooseWinningTeam } = useChooseWinningTeam(challenge._id);

    const handleSubmit = async () => {
        if (type === "teamChallenge") {
            console.log('Selected Team ID:', selectedOption);
            chooseWinningTeam({ teamChallengeId: challenge._id, teamId: selectedOption });
        } else {
            console.log('Selected User ID:', selectedOption);
            chooseWinner({ idChallenge: challenge._id, idUser: selectedOption });
        }
    };

    return (
        <div className="w-1/2 mx-auto space-y-5">
            <div className="space-y-3">
                <label htmlFor="demo-simple-select-label" className="text-sm font-semibold">
                    Select an Option
                </label>

                <select
                    id="demo-simple-select"
                    value={selectedOption}
                    onChange={(event) => {
                        console.log('Selected Value:', event.target.value);
                        setSelectedOption(event.target.value);
                    }}
                    className="w-full px-3 py-2 border rounded-md focus:ring focus:ring-green-500"
                >
                    <option value="" disabled>
                        Select an Option
                    </option>
                    {type === "teamChallenge"
                        ? challenge?.teams.map((team) => (
                            <option value={team?.team._id} key={team?.team._id}>
                                {team?.team?.name}
                            </option>
                        ))
                        : challenge?.users.map((user) => (
                            <option value={user.user._id} key={user._id}>
                                {`${user.user?.firstname} ${user.user?.lastname}`}
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
