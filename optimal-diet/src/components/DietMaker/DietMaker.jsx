import React, { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";

import { FoodCard } from "./FoodCard";
import { Diet } from "../Diet";
import { ActionButtons } from "./ActionButtons";

import { set } from "../../states/foods/foodsSlice";
import { generateRandomColor } from "../../util/generateColor";

import foods from "../../lib/foods";

export const DietMaker = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const foodNames = Object.keys(foods);
  const selectedFoodNames = useSelector((state) => state.foods.value);
  const dispatch = useDispatch();

  const colors = selectedFoodNames.map(() => generateRandomColor());

  const resetSelections = () => {
    dispatch(set([]));
    setData({});
  };

  const selectAllFoods = () => {
    dispatch(set(foodNames));
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async () => {
    const foodList = selectedFoodNames.map((input) => {
      const name = input;
      const { price, nutrition_list } = foods[name];
      return { name, price, nutrition: nutrition_list };
    });

    const prices = foodList.map((item) => item.price);
    const [
      calories,
      cholesterol,
      totalFat,
      sodium,
      carbohydrates,
      dietaryFiber,
      protein,
      vitA,
      vitC,
      calcium,
      iron,
    ] = Array.from({ length: 11 }, (_, i) =>
      foodList.map((item) => item.nutrition[i])
    );

    const generateValues = (arr) => [...arr, ...arr.map((x) => x * -1)];
    const values = [
      [
        ...generateValues(calories),
        ...cholesterol,
        ...totalFat,
        ...sodium,
        ...carbohydrates,
        ...generateValues(dietaryFiber),
        ...generateValues(protein),
        ...generateValues(vitA),
        ...generateValues(vitC),
        ...generateValues(calcium),
        ...generateValues(iron),
      ],
      prices.map((x) => x * -1),
      foodList.length,
    ];

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createmodel",
        { data: values },
        { headers: { "Content-Type": "application/json" } }
      );

      setData(response.data);
      if (response.data.status === "error") {
        setAlert(true);
        setTimeout(() => {
          setData({});
          setAlert(false);
        }, 2100);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100">
      {Object.keys(data).length === 0 || data.status === "error" ? (
        <div className="relative w-full h-full flex flex-col px-8 py-4">
          <ActionButtons
            isAFoodSelected={selectedFoodNames.length === 0 ? false : true}
            handleSubmit={handleSubmit}
            resetSelections={resetSelections}
            selectAllFoods={selectAllFoods}
          />

          <div className="flex w-96 items-center bg-white shadow-md rounded-full px-4 py-2 mb-6">
            <SearchIcon className="text-blue-500" />
            <input
              className="flex-grow bg-transparent focus:outline-none px-4 text-gray-700"
              placeholder="Search foods..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 ml-10">
              {foodNames
                .filter((name) =>
                  name.toLowerCase().includes(search.toLowerCase())
                )
                .map((foodName) => (
                  <FoodCard
                    key={`${foodName}-${selectedFoodNames.includes(foodName)}`}
                    name={foodName}
                    isClicked={selectedFoodNames.includes(foodName)}
                    image={foods[foodName].image}
                  />
                ))}
            </div>
          </div>

          {alert && data.status === "error" && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <Alert severity="error">{data.message}</Alert>
            </div>
          )}
        </div>
      ) : (
        <Diet
          selectedFoodNames={selectedFoodNames}
          basicSolution={data.basicSolution}
          Z={data.Z}
          newDiet={resetSelections}
          colors={colors}
          iterations={data.iterations}
          forViewing={false}
        />
      )}
    </div>
  );
};
