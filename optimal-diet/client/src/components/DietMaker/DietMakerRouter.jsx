import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { DietMaker } from "./DietMaker";
import { Diet } from "../Diet/Diet";

import { set } from "../../states/foods/foodsSlice";

export const DietMakerRouter = () => {
  const [data, setData] = useState({});
  const selectedFoodNames = useSelector((state) => state.foods.value);
  const dispatch = useDispatch();

  const resetSelection = () => {
    dispatch(set([]));
    setData({});
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100">
      <Routes>
        <Route index element={<DietMaker setData={setData} />} />
        <Route
          path="/results"
          element={
            <Diet
              selectedFoodNames={selectedFoodNames}
              foodsServing={data.basicSolution}
              cost={data.Z}
              computationProcess={data.iterations}
              resetSelection={resetSelection}
              forViewing={false}
            />
          }
        />
      </Routes>
    </div>
  );
};
