import React, { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { delDiet } from "../states/user/userSlice";

export const DietCard = ({  date, price, title, data, setView, setData }) => {
  const [onDel, setOnDel] = useState(false);
  const dispatch = useDispatch();
  const handleMouseEnter = () => {
    setOnDel(true);
  };

  const handleMouseLeave = () => {
    setOnDel(false);
  };

  return (
    <div
      className={`relative flex w-72 h-28 bg-white ${
        !onDel && "hover:bg-gray-300"
      } rounded-3xl justify-center items-center`}
      onClick={() => {
        if (!onDel) {
          setData(data);
          setView(true);
        }
      }}
    >
      <div className="text-center">
        {title} <br />
        Price: {price} <br />
        Date: {date}
      </div>
      <button
        className="absolute top-2 right-5 p-2 bg-gray-100 rounded-full hover:bg-red-50 z-20"
        onClick={() => dispatch(delDiet(data.UID))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <DeleteIcon className="top-2 right-2 z-20" />
      </button>
      <button className="absolute w-full h-full"></button>
    </div>
  );
};
