import React, { useEffect, useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

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
              foodsServing={data.foodsServing}
              cost={data.cost}
              computationProcess={data.computationProcess}
              forViewing={true}
            />
          }
        />
      </Routes>
    </div>
  );
};
