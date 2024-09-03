import React from 'react';
import { Link } from 'react-router-dom';

const TeamInvitationModal = ({ team, challenge, isOpen, onClose, onAccept, onRefuse }) => {
    if (!isOpen || !team || !challenge) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
                <div className="text-center mb-6">
                    <h1 className="text-xl font-bold mb-2">Invited to Join {team.name}</h1>
                    <p className="text-gray-500">You have been invited to join {team.name}. Would you like to accept?</p>
                </div>
                <div className="flex items-center justify-between mb-6">
                    <img src={team.teamPicture} alt={team.name} className="w-20 h-20 object-contain rounded-full" />
                    <div className="ml-4">
                        <h2 className="text-xl font-bold">{team.name}</h2>
                    </div>
                </div>
                <div className="mb-6">
                    <p><span className="font-bold">Challenge:</span> {challenge.title}</p>
                    <div className="h-24 break-words overflow-ellipsis overflow-hidden">
                        <p><span className="font-bold">Description:</span> {challenge.description}</p>
                    </div>
                    <p>
                        <span className="font-bold">More details:</span>
                        <a
                            href={`/challenges/challengeDetails/${challenge._id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            View Challenge
                        </a>
                    </p>
                </div>
                <div className="flex justify-end">
                    <button onClick={onRefuse}
                            className="px-4 py-2 bg-red-500 text-white rounded mr-4 hover:bg-red-600">Refuse
                    </button>
                    <button onClick={onAccept} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Accept</button>
                </div>
            </div>
        </div>
    );
};

export default TeamInvitationModal;
