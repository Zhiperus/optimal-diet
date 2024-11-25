import React, { useState } from "react";
import { Food } from "./FoodCard";
import foods from "../foods/foods";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Diet from "./Diet";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";
import { set } from "../states/foods/foodsSlice";

export const DietMaker = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);

  const foodNames = Object.keys(foods);
  const selectedFoodNames = useSelector((state) => state.foods.value);
  const dispatch = useDispatch();

  // Generate dynamic colors for the pie chart
  const generateRandomColor = () =>
    `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;

  const colors = selectedFoodNames.map(() => generateRandomColor());

  // Reset selections
  const resetSelections = () => {
    setData({});
    dispatch(set([]));
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Handle form submission
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
          {/* Header */}
          <div className="flex h-10 justify-between items-center mb-4">
            <h2 className="italic text-lg text-gray-700">
              Select items for your diet...
            </h2>
            {selectedFoodNames.length > 0 && (
              <button
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
                onClick={handleSubmit}
              >
                Done
              </button>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex w-96 items-center bg-white shadow-md rounded-full px-4 py-2 mb-6">
            <SearchIcon className="text-blue-500" />
            <input
              className="flex-grow bg-transparent focus:outline-none px-4 text-gray-700"
              placeholder="Search foods..."
              value={search}
              onChange={handleSearchChange}
            />
          </div>

          {/* Food Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 ml-10">
              {foodNames
                .filter((name) =>
                  name.toLowerCase().includes(search.toLowerCase())
                )
                .map((foodName) => (
                  <Food
                    key={foodName}
                    name={foodName}
                    clicked={selectedFoodNames.includes(foodName)}
                    image={foods[foodName].image}
                  />
                ))}
            </div>
          </div>

          {/* Alert */}
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
