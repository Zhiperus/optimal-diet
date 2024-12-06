import React, { useState } from "react"; // Importing necessary hooks from React
import { FoodCard } from "./FoodCard"; // Importing FoodCard component to display food items
import foods from "../foods/foods"; // Importing the foods data
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks
import axios from "axios"; // Importing axios for making HTTP requests
import Diet from "./Diet"; // Importing Diet component to display the final diet solution
import Alert from "@mui/material/Alert"; // Importing Material-UI Alert component for error messages
import SearchIcon from "@mui/icons-material/Search"; // Importing Material-UI Search Icon for the search bar
import { set } from "../states/foods/foodsSlice"; // Importing Redux action to reset selected foods
import { ConstructionOutlined } from "@mui/icons-material";

// Main DietMaker component
export const DietMaker = () => {
  // State variables
  const [data, setData] = useState({}); // Holds the backend response data
  const [search, setSearch] = useState(""); // Holds the value of the search input
  const [alert, setAlert] = useState(false); // Controls the visibility of the error alert

  // Fetching food names and selected food items from Redux state
  const foodNames = Object.keys(foods); // Extracting food names from the foods object
  const selectedFoodNames = useSelector((state) => state.foods.value); // Getting selected food names from Redux state
  const dispatch = useDispatch(); // Getting the dispatch function to send actions to Redux

  // Function to generate random colors for pie chart visualization
  const generateRandomColor = () =>
    `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
    })`;

  // Assigning random colors to each selected food item
  const colors = selectedFoodNames.map(() => generateRandomColor());

  // Function to reset food selections
  const resetSelections = () => {
    dispatch(set([])); // Resetting Redux state for selected foods
    setData({}); // Resetting the local data state
  };

  // Function to handle selecting all food items
  const selectAllFoods = () => {
    dispatch(set(foodNames)); // Update Redux state with all food names
  };

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearch(e.target.value); // Updating the search state with the new value
  };

  // Function to handle form submission and make API request to backend
  const handleSubmit = async () => {
    // Preparing the food list with name, price, and nutrition data
    const foodList = selectedFoodNames.map((input) => {
      const name = input;
      const { price, nutrition_list } = foods[name]; // Extracting price and nutrition information from foods data
      return { name, price, nutrition: nutrition_list }; // Returning an object with food data
    });

    // Extracting individual nutrition values from the food list
    const prices = foodList.map((item) => item.price); // Extracting prices
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
    ] = Array.from(
      { length: 11 },
      (_, i) => foodList.map((item) => item.nutrition[i]) // Extracting nutrition values (index 0-10)
    );

    // Function to generate positive and negative values for pie chart visualization
    const generateValues = (arr) => [...arr, ...arr.map((x) => x * -1)];
    const values = [
      // Creating the values array for pie chart visualization
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
      prices.map((x) => x * -1), // Converting prices to negative values for pie chart
      foodList.length, // The number of selected foods
    ];

    // Making the POST request to the backend to process the food data
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createmodel", // Backend API endpoint
        { data: values }, // Sending the prepared food data
        { headers: { "Content-Type": "application/json" } } // Setting the request header
      );

      setData(response.data); // Storing the backend response in the state
      // Checking if there was an error in the backend response
      if (response.data.status === "error") {
        setAlert(true); // Displaying the error alert
        setTimeout(() => {
          setData({}); // Resetting data after alert duration
          setAlert(false); // Hiding the error alert
        }, 2100);
      }
    } catch (error) {
      console.error("Error posting data:", error); // Logging any error that occurs during the request
    }
  };

  return (
    <div className="flex flex-col w-full h-screen overflow-hidden bg-gray-100">
      {/* Conditional rendering based on the response data */}
      {Object.keys(data).length === 0 || data.status === "error" ? (
        <div className="relative w-full h-full flex flex-col px-8 py-4">
          {/* Header Section */}
          <div className="flex h-10 justify-between items-center mb-4">
            <h2 className="italic text-lg text-gray-700">
              Select items for your diet...
            </h2>
            {selectedFoodNames.length > 0 && (
              <div className="flex gap-5">
                {/* Buttons for submitting, resetting, and selecting all foods */}
                <button
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
                  onClick={handleSubmit} // Submit the form
                >
                  Done
                </button>
                <button
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
                  onClick={resetSelections} // Reset the selections
                >
                  Reset
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
                  onClick={selectAllFoods} // Select all foods
                >
                  Select All
                </button>
              </div>
            )}
          </div>

          {/* Search Bar */}
          <div className="flex w-96 items-center bg-white shadow-md rounded-full px-4 py-2 mb-6">
            <SearchIcon className="text-blue-500" />
            <input
              className="flex-grow bg-transparent focus:outline-none px-4 text-gray-700"
              placeholder="Search foods..." // Search placeholder text
              value={search} // Bind input to search state
              onChange={handleSearchChange} // Update search state when input changes
            />
          </div>

          {/* Food Grid */}
          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-5 ml-10">
              {/* Mapping through food names and displaying FoodCard components */}
              {foodNames
                .filter(
                  (name) => name.toLowerCase().includes(search.toLowerCase()) // Filtering foods based on search
                )
                .map((foodName) => (
                  <FoodCard
                    key={`${foodName}-${selectedFoodNames.includes(foodName)}`} // Unique key for each FoodCard
                    name={foodName} // Passing the food name to FoodCard
                    clicked={selectedFoodNames.includes(foodName)} // Whether the food is selected
                    image={foods[foodName].image} // Passing the image URL to FoodCard
                  />
                ))}
            </div>
          </div>

          {/* Alert Section */}
          {alert && data.status === "error" && (
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
              <Alert severity="error">{data.message}</Alert>{" "}
              {/* Displaying error message */}
            </div>
          )}
        </div>
      ) : (
        // Diet component rendered when data is available
        <Diet
          selectedFoodNames={selectedFoodNames} // Passing selected foods
          basicSolution={data.basicSolution} // Passing basic solution from backend
          Z={data.Z} // Passing additional data from backend
          newDiet={resetSelections} // Passing the resetSelections function for resetting the diet
          colors={colors} // Passing the generated random colors
          iterations={data.iterations} // Passing the number of iterations for the solution
          forViewing={false} // Boolean flag for viewing mode
        />
      )}
    </div>
  );
};
