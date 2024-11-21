import React, { useState } from "react";
import { Food } from "./Food";
import foods from "../foods/foods";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Diet from "./Diet";
import Alert from "@mui/material/Alert";
import SearchIcon from "@mui/icons-material/Search";

export const DietSolver = () => {
  const [data, setData] = useState({});
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState(false);
  const foodNames = Object.keys(foods);
  const selectedFoodNames = useSelector((state) => state.foods.value);
  const states = foodNames.map((foodName) => {
    if (selectedFoodNames.includes(foodName)) {
      return <Food key={foodName} name={foodName} clicked={true} />;
    } else {
      return <Food key={foodName} name={foodName} clicked={false} />;
    }
  });

  var dynamicColors = () => {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  };

  const colors = selectedFoodNames.map(() => dynamicColors());

  const handleClick = () => {
    setData({});
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    const foodList = selectedFoodNames.map((input) => {
      const name = input;
      const { price, nutrition_list } = foods[name];
      return { name, price, nutrition: nutrition_list };
    });

    // Deconstruct data into arrays
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

    // Helper function to generate positive and negative values
    const generateValues = (arr) => [...arr, ...arr.map((x) => x * -1)];

    // Prepare the values array
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

    // Send data to the API
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createmodel",
        { data: values },
        { headers: { "Content-Type": "application/json" } }
      );

      // Log the response
      setData(response.data);
      if (response.data.status === "error") {
        setAlert(true);
        setTimeout(() => setData({}), 2100);
        setTimeout(() => setAlert(false), 2100);
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      {Object.keys(data).length === 0 || data.status === "error" ? (
        <div className="relative w-3/4 h-[100vh] flex flex-col">
          <div className="flex mt-5 justify-between">
            <h2 className="italic text-lg -ml-5">
              Select items for your diet...
            </h2>
            {selectedFoodNames.length != 0 && (
              <button
                className="bg-green-600 rounded-3xl w-44 h-10"
                onClick={handleSubmit}
              >
                Done
              </button>
            )}
          </div>
          <div className="flex w-96 justifty-center items-center">
            <SearchIcon className="fill-blue-500 z-10" />
            <input
              className="w-full h-10 bg-transparent rounded-3xl p-5 placeholder-slate-500 mb-3 z-0"
              placeholder="Search..."
              type="text"
              id="search"
              name="search"
              value={search}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5 flex-1 overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-4 gap-10">
              {states.filter((element) =>
                element.props.name.toLowerCase().includes(search.toLowerCase())
              )}
            </div>
          </div>
          <div
            className={`transition-all delay-[2000ms] absolute mb-5 rounded-xl overflow-hidden bottom-0 place-self-center ${
              alert ? "opacity-0" : ""
            }`}
          >
            {Object.keys(data).length > 0 && data.status === "error" && (
              <Alert className="place-self-center" severity="error">
                {data.message}
              </Alert>
            )}
          </div>
        </div>
      ) : (
        <Diet
          selectedFoodNames={selectedFoodNames}
          data={data}
          newDiet={handleClick}
          colors={colors}
        />
      )}
    </>
  );
};
