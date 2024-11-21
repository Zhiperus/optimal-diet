import { useState } from "react";
import foods from "./foods/foods";
import axios from "axios";
import { DietSolver } from "./components/DietSolver";
import { Navbar } from "./components/Navbar";
import Diet from "./components/Diet";

function App() {
  const [data, setData] = useState({});
  const [names, setNames] = useState([]);
  const foodNames = Object.keys(foods);

  const handleClick = async (e) => {
    e.preventDefault();

    // Collect checked items and their associated data
    const selectedFoods = Array.from(e.target)
      .filter((input) => input.checked)
      .map((input) => {
        const { name } = input;
        const { price, nutrition_list } = foods[name];
        return { name, price, nutrition: nutrition_list };
      });

    // If no food is selected, return early
    if (selectedFoods.length === 0) {
      console.warn("No food selected");
      return;
    }

    // Deconstruct data into arrays
    const names = selectedFoods.map((item) => item.name);
    const prices = selectedFoods.map((item) => item.price);
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
      selectedFoods.map((item) => item.nutrition[i])
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
      selectedFoods.length,
    ];

    // Send data to the API
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/createmodel",
        { data: values },
        { headers: { "Content-Type": "application/json" } }
      );

      // Reset the form
      e.target.reset();

      // Log the response
      setNames(names);
      setData(response.data);
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="flex w-screen h-screen gap-20">
      {/* <form className="grid grid-cols-10" onSubmit={handleClick}>
        {foodNames.map((food_name) => (
          <label key={food_name}>
            <input type="checkbox" id={food_name} name={food_name}></input>
            {food_name}
          </label>
        ))}
        <button type="submit">Submit</button>
      </form>
      {names.length != 0 && data.status == "success" && (
        <div
          className={`grid grid-cols-2 grid-rows-${names.length} gap-10 grid-flow-row w-96 justify-self-center mt-20`}
        >
          {names.map((name, index) => {
            if (data.basicSolution[index] != 0) {
              return (
                <>
                  <h2 key={name}>{name}</h2>
                  <h2 key={name}>{data.basicSolution[index]}</h2>
                </>
              );
            }
          })}
        </div>
      )}
      <h1>{data.status == "error" ? data.message : ""}</h1> */}
      <Navbar />
      <DietSolver />
    </div>
  );
}

export default App;
