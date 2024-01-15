import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  useConversations,
  useCreateConversation,
} from "../../../../hooks/react-query/useConversations";
import { axios } from "../../../../axios";
import { useQuery } from "react-query";

const UsersLatestMsgs = () => {
  const url = process.env.REACT_APP_API_ENDPOINT;
  const { user } = useSelector((state) => state?.auth);
  const { data: conversations } = useConversations(user?._id);
  const [query, setQuery] = useState("");
  const { mutate, data } = useCreateConversation(user._id);
  const { data: users } = useQuery({
    queryKey: ["users", query],
    queryFn: async () => {
      const { data } = await axios.get(`${url}/users?search=${query}`);
      return data;
    },
  });
  const handleUserClick = async (otherUser) => {
    if (otherUser.companyName) {
      mutate({
        senderId: user._id,
        receiverId: otherUser.user,
        company: otherUser._id,
      });
    } else {
      mutate({ senderId: user._id, receiverId: otherUser._id });
    }
    setQuery("");
  };
  return (
    <div>
      <div className="flex justify-between px-3 pt-1 text-white">
        <div className="flex items-center w-full py-2">
          <button
            aria-haspopup="true"
            className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200"
          >
            <svg
              className="w-6 h-6 text-gray-600 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="nonzero"
                d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"
              />
            </svg>
          </button>
          <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-none"
              >
                <svg
                  className="w-6 h-6 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill-rule="nonzero"
                    d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
                  />
                </svg>
              </button>
            </span>
            <input
              type="search"
              name="q"
              className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
              placeholder="Search..."
              autocomplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="border-b shadow-bot">
        <ul className="flex flex-row items-center inline-block px-2 list-none select-none">
          <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
            <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-blue-500">
              All
            </a>
          </li>

          <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
            <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
              Groups
            </a>
          </li>
          <li className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200">
            <a className="flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 border-transparent">
              Channels
            </a>
          </li>
        </ul>
      </div>
      <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
        <ul className="flex flex-col w-full h-screen px-2 select-none">
          <li className="flex flex-no-wrap items-center pr-3 text-black rounded-lg cursor-pointer mt-200 py-65">
            <div className="flex justify-between w-full focus:outline-none">
              <div className="flex justify-between w-full">
                <div className="items-center flex-1 min-w-0">
                  {query === ""
                    ? conversations?.map((conversation) => {
                        const otherUser = conversation?.members?.find(
                          (member) => member?.id !== user?._id
                        );
                        if (otherUser) {
                          return (
                            <div key={conversation?.conversationId}>
                              <Link
                                to={`/chat/${conversation?.conversationId}`}
                                className=" hover:bg-gray-100  p-4 flex flex-col gap-2 w-full"
                              >
                                <div className="flex gap-4 items-center">
                                  <img
                                    src={otherUser?.picturePath}
                                    alt="User Avatar"
                                    className="w-12 h-12 rounded-full object-cover"
                                  />
                                  <div>
                                    <div>
                                      <div className=" flex flex-row gap-1">
                                        <p className="font-semibold dark:text-gray-200">
                                          {otherUser?.firstname}
                                        </p>
                                        <p className="font-semibold dark:text-gray-200">
                                          {otherUser?.lastname}
                                          {otherUser?.companyName
                                            ? `(${otherUser?.companyName})`
                                            : ""}
                                        </p>
                                      </div>
                                    </div>
                                    <div>
                                      <p className="text-[0.8rem] truncate dark:text-white max-w-[250px] ">
                                        {otherUser?.latestMessage}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                              <div className="w-full border-l border-gray-100 border-b-2" />
                            </div>
                          );
                        } else return null;
                      })
                    : users?.map((user) => (
                        <li
                          key={user._id}
                          className="px-8 py-4 hover:bg-gray-100"
                        >
                          <button
                            className="flex items-center w-full"
                            onClick={() => handleUserClick(user)}
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={
                                  user.companyName
                                    ? user.companyLogo
                                    : user.picturePath
                                }
                                alt="User Avatar"
                                className="object-cover w-12 h-12 rounded-full border"
                              />
                              <div className="flex flex-col">
                                {user.companyName ? (
                                  <h6 className="text-[1rem]">
                                    {user.companyName}
                                  </h6>
                                ) : (
                                  <div className="flex gap-1">
                                    <h6 className="text-[1rem]">
                                      {user.firstname}
                                    </h6>
                                    <h6 className="text-[1rem]">
                                      {user.lastname}
                                    </h6>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
        <button className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink">
          <svg
            className="w-6 h-6 text-white fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill-rule="nonzero"
              d="M3,17.46 L3,20.5 C3,20.78 3.22,21 3.5,21 L6.54,21 C6.67,21 6.8,20.95 6.89,20.85 L17.4562847,10.2933914 C17.6300744,10.1200486 17.6494989,9.85064903 17.514594,9.65572084 L17.4564466,9.58644661 L17.4564466,9.58644661 L14.4135534,6.54355339 C14.2182912,6.34829124 13.9017088,6.34829124 13.7064466,6.54355339 L3.15,17.1 C3.05,17.2 3,17.32 3,17.46 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.4835534,4.76644661 C15.2882912,4.96170876 15.2882912,5.27829124 15.4835534,5.47355339 L18.5264466,8.51644661 C18.7217088,8.71170876 19.0382912,8.71170876 19.2335534,8.51644661 L20.71,7.04 Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UsersLatestMsgs;
