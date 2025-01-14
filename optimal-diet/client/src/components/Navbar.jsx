import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LogoutIcon from "@mui/icons-material/Logout";

import { logout } from "../states/user/userSlice";
import { useTheme } from "@emotion/react";

export const Navbar = () => {
  const user = useSelector((state) => state.user.value);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userName = user.name || "Guest";
  const profileImage =
    user.image !== "" ? user.image : "https://via.placeholder.com/150";

  const tabs = [
    { label: "Diets", path: "/dietlists", icon: <MenuBookIcon /> },
    {
      label: "Diet Maker",
      path: "/dietmaker",
      icon: <LocalDiningIcon />,
    },
  ];

  const logoutUser = () => {
    if (user._id) {
      try {
        axios.put("http://localhost:3000/logout", {
          _id: user._id,
          diets: user.diets,
        });

        dispatch(logout());
        navigate("/dietmaker");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

  return (
    <div
      className={`flex flex-col h-screen ${
        isExpanded ? "w-64" : "w-[60px]"
      } bg-gray-200 transition-all duration-150 ease-in-out shadow-lg`}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
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
            {user._id ? (
              userName
            ) : (
              <Link to="/login">
                <button>Log in</button>
              </Link>
            )}
          </h2>
        )}
      </div>

      {/* Navigation Tabs */}
      <div className="flex-1 flex flex-col items-start px-3 mt-5">
        {tabs.map((tab, index) => (
          <Link
            key={index}
            to={tab.path}
            className={`flex items-center w-full my-2 p-2 rounded-md hover:bg-green-200 cursor-pointer transition-all duration-300 ${
              useLocation().pathname === tab.path
                ? "border-l-4 border-gray-600"
                : ""
            }`}
          >
            {tab.icon}
            {isExpanded && (
              <span className="ml-4 text-gray-800 text-sm font-medium">
                {tab.label}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Log Out Section */}
      {user._id && (
        <div
          className="p-3 flex items-center justify-start hover:bg-red-200 rounded-md cursor-pointer"
          onClick={logoutUser}
        >
          <LogoutIcon className="text-red-500" />
          {isExpanded && (
            <span className="ml-4 text-red-500 text-sm font-medium">
              Log Out
            </span>
          )}
        </div>
      )}
    </div>
  );
};
