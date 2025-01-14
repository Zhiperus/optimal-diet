import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { add, del } from "../../states/foods/foodsSlice";

export const FoodCard = ({ name, isClicked, image }) => {
  const [click, setClick] = useState(isClicked);
  const dispatch = useDispatch();

  const handleClick = () => {
    const newState = !click;
    setClick(newState);
    dispatch(newState ? add(name) : del(name));
  };

  return (
    <div
      className={`relative bg-gray-300 w-64 h-[280px] flex flex-col rounded-2xl hover:shadow-2xl hover:scale-105 overflow-hidden ${
        click ? "border-[5px] border-green-400 order-first" : ""
      }`}
    >
      <button
        type="button"
        className="absolute inset-0 w-64 h-80 cursor-pointer z-10"
        onClick={handleClick}
      ></button>
      <div>
        <img className="w-full h-[200px] z-0" src={`${image}`}></img>
      </div>

      <h2 className="flex justify-center items-center text-center h-3/4 text-lg font-[Georgia]">
        {name}
      </h2>
    </div>
  );
};
