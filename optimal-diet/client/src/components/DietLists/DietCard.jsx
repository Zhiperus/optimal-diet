import React, { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

import { delDiet } from "../../states/user/userSlice";
import foods from "../../lib/foods";
import options from "../../lib/options";
import { Diet } from "../Diet/Diet";

export const DietCard = ({ date, cost, title, data, setData }) => {
  const [onDel, setOnDel] = useState(false);
  const [imageURL, setImageURL] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the image URL once when the component mounts
    const randomFood =
      data.selectedFoodNames[
        Math.floor(Math.random() * data.selectedFoodNames.length)
      ];
    setImageURL(foods[randomFood]?.image || "/placeholder.jpg"); // Fallback for missing image
  }, [data.selectedFoodNames]);

  const handleMouseEnter = () => setOnDel(true);
  const handleMouseLeave = () => setOnDel(false);

  return (
    <div
      className={`relative flex w-72 h-48 bg-white ${
        !onDel && "hover:bg-gray-300"
      } rounded-3xl flex-col justify-between items-center shadow-md`}
      onClick={() => {
        if (!onDel) {
          setData(data);
          navigate("results");
        }
      }}
    >
      {/* Image Section */}
      <div className="relative w-full h-21 overflow-hidden rounded-t-3xl">
        <img
          src={imageURL}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Title Section */}
      <div className="w-full bg-gray-100 py-2 px-4 text-center">
        <h3 className="font-bold text-lg text-gray-800 truncate">{title}</h3>
      </div>

      {/* Content Section */}
      <div className="flex flex-col justify-center items-center p-3 text-center">
        <p className="text-sm text-gray-500">
          Price: {options.currency} {cost} <br />
          Date: {date}
        </p>
      </div>

      {/* Delete Button */}
      <button
        className="absolute top-2 right-5 p-2 bg-gray-100 rounded-full hover:bg-red-300 z-20"
        onClick={(e) => {
          e.stopPropagation();
          dispatch(delDiet(data.UID));
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DeleteIcon className="top-2 right-2 z-20" />
      </button>

      {/* Clickable Full Area */}
      <button className="absolute w-full h-full opacity-0"></button>
    </div>
  );
};
