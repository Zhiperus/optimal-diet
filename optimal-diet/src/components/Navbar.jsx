import React, { useState } from "react";
import { Avatar } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../states/user/userSlice";
import axios from "axios";

export const Navbar = ({ changeTab, currentTab }) => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false); // Track if the navbar is expanded
  const userName = user.name; // Replace with dynamic user data
  const profileImage =
    user.image !== ""
      ? (new Image().src = "data:image/jpg;base64," + user.image)
      : "https://via.placeholder.com/150"; // Replace with user profile image

  const tabs = [
    { label: "Diets", icon: <MenuBookIcon /> },
    { label: "Diet Maker", icon: <LocalDiningIcon /> },
  ];

  const logoutUser = async () => {
    if (user._id !== "") {
      try {
        const { _id, diets } = user;

        dispatch(logout());
        changeTab("Diet Maker");

        await axios.put("http://localhost:3000/logout", {
          _id: _id,
          diets: diets,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div
      className={`flex flex-col h-screen bg-gray-100" ${
        isExpanded ? "w-64" : "w-[60px]"
      } bg-gray-200 transition-all duration-150 ease-in-out shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)} // Expand on hover
      onMouseLeave={() => setIsExpanded(false)} // Collapse on mouse leave
    >
      {/* Profile Section */}
      <div className="flex flex-col items-center py-5 bg-gray-300">
        <Avatar
          src={profileImage}
          alt={userName}
          className="w-12 h-12 hover:scale-110 transition-transform duration-300"
        />
        {isExpanded && (
          <h2 className="mt-3 text-gray-800 font-medium text-lg text-center">
            {user._id !== "" ? (
              userName
            ) : (
              <button onClick={() => changeTab("Login")}>Log in</button>
            )}
          </h2>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 flex flex-col items-start px-3 mt-5">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`flex items-center w-full my-2 p-2 rounded-md hover:bg-green-200 cursor-pointer transition-all duration-300 ${
              currentTab === tab.label ? "border-l-4 border-gray-600" : ""
            }`}
            onClick={() => changeTab(tab.label)}
          >
            {tab.icon}
            {isExpanded && (
              <span className="ml-4 text-gray-800 text-sm font-medium">
                {tab.label}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Log Out Section */}
      <div
        className="p-3 flex items-center justify-start hover:bg-red-200 rounded-md cursor-pointer"
        onClick={logoutUser}
      >
        <LogoutIcon className="text-red-500" />
        {isExpanded && (
          <span className="ml-4 text-red-500 text-sm font-medium">Log Out</span>
        )}
      </div>
    </div>
  );
};
