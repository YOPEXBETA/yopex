import React from 'react';

const DangerZone = ({ onDelete }) => {
    return (
        <div className="mt-8">
            <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
            <div className="mt-2 p-4 border border-red-500 rounded-lg">
                <div className="flex justify-between items-center">
                    <div>
                        <strong>Delete organization</strong>
                        <p className="mt-2 text-sm text-black">
                            Once deleted, it will be gone forever. Please be certain.
                        </p>
                    </div>
                    <button
                        onClick={onDelete}
                        className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DangerZone;
