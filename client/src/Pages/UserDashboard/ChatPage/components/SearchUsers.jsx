import AddIcon from "@mui/icons-material/Add";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import TextField from "@mui/material/TextField";
import React, { useEffect, useState } from "react";    
import { useSelector } from "react-redux";
import { useCreateConversation } from "../../../../hooks/react-query/useConversations";
import { useSuggestedUsers, useUserById } from "../../../../hooks/react-query/useUsers";
import { ListItem } from "@mui/material";
    
    

const SearchUsers = () => {
        
      const { user } = useSelector((state) => state.auth);
      const { mutate } = useCreateConversation(user._id);
      let { data: users } = useSuggestedUsers();
      const { data: userProfile} = useUserById(user._id);
      const [selectedOption, setSelectedOption] = useState(user._id);
      const [filteredUsers, setFilteredUsers] = useState(users);
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (
          event &&
          event.type === "keydown" &&
          (event.key === "Tab" || event.key === "Shift")
        ) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const handleTextFieldClick = (event) => {
        event.stopPropagation();
        event.preventDefault();
      };

      const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

      useEffect(() => {
        if (selectedOption !== user._id && users) {
          const filtered = users?.filter((user) => user.role === "user");
          setFilteredUsers(filtered);
        } else {
          setFilteredUsers(users);
        }
      }, [selectedOption, users]);
      
    
      const handleUserClick = (otherUser) => {
        if (otherUser.companyName) {
          mutate({
            senderId: user._id,
            receiverId: otherUser.user,
            company: otherUser._id,
          });
        }
        else if (selectedOption !== user._id) {
          mutate({ senderId: otherUser._id, receiverId: user._id , company:selectedOption });
        }else{
          mutate({ senderId: user._id, receiverId: otherUser._id });
        }
        setState({ ...state, left: false });
      };
    
      
    
      return (
        <div>
          <button onClick={handleOpenModal}>
                <AddIcon label="Open Modal" variant="outlined" />
          </button>
    
          {isModalOpen && (
                <div className="fixed inset-0 z-[100]">
                  <div className="items-center  justify-center flex">
                    <div className="bg-white p-6 rounded shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <ul>
                            <ListItem>
                                <TextField fullWidth onClick={handleTextFieldClick} />
                            </ListItem>
                            <ul>
            
            {userProfile?.companies.length!==0 && <select
              id="selectField"
              className="p-2 border rounded-md focus:ring focus:ring-blue-300 mb-2 mx-5"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              >
                <option value={user._id}>Current User</option>
                {userProfile?.companies.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.companyName}
                </option>
                ))}
            </select>}
    
            {users?.map((user) => (
              <li key={user._id} className="px-8 py-4 hover:bg-gray-100">
                <button
                  className="flex items-center w-full"
                  onClick={() => handleUserClick(user)}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-12 h-12">
                      <img
                        src={user.companyName ? user.companyLogo : user.picturePath}
                        alt="User Avatar"
                        className="w-full h-full rounded-full bg-green-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      {user.companyName ? (
                        <h6 className="text-[1rem]">{user.companyName}</h6>
                      ) : (
                        <div className="flex gap-1">
                          <h6 className="text-[1rem]">{user.firstname}</h6>
                          <h6 className="text-[1rem]">{user.lastname}</h6>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
                        </ul>
                    </div>
                </div>
            

                <div className="fixed inset-0 bg-black opacity-50" onClick={handleCloseModal} />

            </div>
          )}
        </div>
      );
    };

export default SearchUsers;