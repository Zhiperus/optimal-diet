import React, { useState } from "react";

import { Route, Routes } from "react-router-dom";

import { DietList } from "./DietLists";
import { Diet } from "../Diet/Diet";

export const DietListsRouter = () => {
  const [data, setData] = useState({});

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100">
      <Routes>
        <Route index element={<DietList setData={setData} />} />
        <Route
          path="/results"
          element={
            <Diet
              selectedFoodNames={data.selectedFoodNames}
              foodsServing={data.basicSolution}
              cost={data.Z}
              computationProcess={data.iterations}
              forViewing={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
