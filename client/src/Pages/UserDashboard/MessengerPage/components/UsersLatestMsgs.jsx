import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AvatarProfile from "../../../../assets/images/AvatarProfile.jpg";
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
        <div className="flex items-center w-full py-2 ">
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
              className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-green-500 focus:text-gray-900 focus:shadow-outline-blue"
              placeholder="Search..."
              autocomplete="off"
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>
        </div>
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
                                  {otherUser?.picturePath ? (
                                    <img
                                      src={otherUser.picturePath}
                                      alt="User Avatar"
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                  ) : (
                                    <img
                                      src={AvatarProfile}
                                      alt="Default Avatar"
                                      className="w-12 h-12 rounded-full object-cover"
                                    />
                                  )}

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
    </div>
  );
};

export default UsersLatestMsgs;
