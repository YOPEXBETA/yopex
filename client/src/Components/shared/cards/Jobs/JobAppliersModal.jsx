import { Link } from "react-router-dom";
import { useAppliers } from "../../../../hooks/react-query/useJobs";
import LoadingSpinner from "../../../LoadingSpinner";
import ApplierMenuIcon from "../../../../Pages/UserDashboard/CompanyPage/ContentSide/Components/MyAppliers/ApplierMenuIcon";

const JobAppliersModal = ({ jobId, onClose, isModalOpen }) => {
  const { data: appliers, isLoading: appliersLoading } = useAppliers(jobId);

  return (
    <div
      className={`fixed inset-0 z-50 ${
        isModalOpen ? "backdrop-blur-sm" : "hidden"
      } `}
    >
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="overflow-y-auto min-h-full max-h-[40rem] inline-block align-bottom bg-white dark:bg-zinc-700 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 md:max-w-lg w-full">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-800 p-4 dark:text-white">
              Appliers
            </h4>

            <div>
              <button
                className="text-gray-500 hover-text-gray-700 float-right p-4"
                onClick={onClose}
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-4">
            {appliersLoading ? (
              // Display a loading spinner while the data is being fetched
              <LoadingSpinner />
            ) : (
              // Render the appliers list when data is available
              <ul>
                {appliers?.map((applier, index) => (
                  <Link to={`/profile/${applier._id}`} key={index}>
                    <li className="flex items-center justify-between my-6">
                      <div className="flex items-center">
                        <img
                          src={applier.picturePath}
                          alt="applier"
                          className="h-12 w-12 rounded-full mr-3 object-cover"
                        />
                        <div className="flex gap-1">
                          <p className="text-gray-700 dark:text-white">
                            {applier?.firstname}
                          </p>
                          <p className="text-gray-700 dark:text-white">
                            {applier?.lastname}
                          </p>
                        </div>
                      </div>
                      <div className="mr-4 flex items-center justify-center text-gray-600 dark:text-white">
                        <div onClick={(e) => e.preventDefault()}>
                          <ApplierMenuIcon Applier={applier} job={jobId} />
                        </div>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobAppliersModal;
