import React, { useState } from "react";
import { DietCard } from "./DietCard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const DietList = ({ setData }) => {
  const user = useSelector((state) => state.user.value);
  const navigate = useNavigate();

  return (
    <>
      {user._id === "" ? (
        <div className="flex justify-center items-center w-screen h-screen bg-gray-100">
          <div className="bg-white rounded-lg shadow-lg p-8 w-96 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Login to View Your Diets!
            </h2>
            <p className="text-gray-600 mb-6">
              Access your personalized meal plans and track your progress
              effortlessly.
            </p>
            <button
              onClick={() => navigate("/login")}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            >
              Login Now
            </button>
          </div>
        </div>
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
                  title={diet.title}
                  date={diet.date}
                  cost={diet.cost}
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
