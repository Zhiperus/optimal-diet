import React, { useState } from "react";
import { DietCard } from "./DietCard";
import { useSelector } from "react-redux";

export const DietList = ({ setData }) => {
  const user = useSelector((state) => state.user.value);

  return (
    <>
      {user._id === "" ? (
        <h2 className="flex justify-center items-center w-screen h-screen ">
          Login to view your diets!
        </h2>
      ) : (
        <div className="flex flex-col w-screen h-screen bg-gray-100 pl-14">
          <h1 className="flex font-bold text-3xl justify-center mt-5">
            Saved Diets
          </h1>
          <button className="flex place-self-end mr-20 p-2 mb-10 rounded-3xl bg-gray-300">
            Select Diets
          </button>
          <div className="grid grid-cols-4 gap-5">
            {user.diets.map((diet) => {
              return (
                <DietCard
                  key={diet.UID}
                  date={diet.date}
                  cost={diet.Z}
                  data={diet}
                  setData={setData}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
