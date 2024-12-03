import React, { useState } from "react"; // Importing React and useState hook
import foods from "../foods/foods"; // Importing foods data
import DietPie from "./DietPie"; // Importing the DietPie component for displaying the pie chart
import PieChartIcon from "@mui/icons-material/PieChart"; // Importing the PieChartIcon for switching modes
import TableChartIcon from "@mui/icons-material/TableChart"; // Importing the TableChartIcon for switching modes
import Computation from "./Computation"; // Importing Computation component for displaying computation details
import { useDispatch, useSelector } from "react-redux"; // Importing Redux hooks for state management
import { addDiet } from "../states/user/userSlice"; // Importing Redux action to add a saved diet
import { uid } from "uid/single"; // Importing UID generator for creating unique IDs

// Diet component for displaying and interacting with the diet data
const Diet = ({
  selectedFoodNames, // List of selected food names
  basicSolution, // The calculated servings for each selected food
  Z, // The cost of the optimal diet
  colors, // Array of colors for the pie chart
  iterations, // Number of iterations from the backend for optimization
  newDiet, // Function to reset the diet
  forViewing, // Boolean flag to determine if it's in viewing mode
  setView, // Function to set the view state (back to previous view)
}) => {
  // State variables for managing component behavior
  const user = useSelector((state) => state.user.value); // Accessing the user state from Redux
  const [mode, setMode] = useState("table"); // State for toggling between table and pie chart views
  const [saving, setSaving] = useState(false); // State for handling save mode
  const [hovering, setHovering] = useState(false); // State for handling hover behavior during saving
  const [title, setTitle] = useState(""); // State for the diet title when saving
  const [viewComputationMode, setViewComputationMode] = useState(false); // State to toggle computation view
  const dispatch = useDispatch(); // Redux dispatch function

  // Function to toggle between table and pie chart modes
  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "table" ? "pie" : "table"));

  // Function to show the computation details
  const showComputation = () => setViewComputationMode(true);

  // Function to hide the computation details
  const hideComputation = () => setViewComputationMode(false);

  // Function to save the current diet
  const saveDiet = () => {
    dispatch(
      addDiet({
        UID: uid(), // Generating a unique ID for the saved diet
        title, // The title entered by the user
        selectedFoodNames, // Selected food names
        basicSolution, // The servings for each food
        Z, // The cost of the diet
        colors, // Colors for pie chart visualization
        iterations, // Number of iterations for optimization
        date: new Date().toDateString(), // The current date
      })
    );
  };

  // Function to go back to the previous view
  const goBack = () => setView(false);

  // Function to render the selected foods list
  const renderSelectedFoods = () =>
    selectedFoodNames.map((food) => (
      <div
        key={food}
        className="flex items-center gap-4 bg-gray-700 rounded-lg p-2 shadow"
      >
        <img
          className="w-12 h-12 rounded-md object-cover"
          src={foods[food].image} // Displaying food image
          alt={food}
        />
        <h3 className="flex-grow text-sm font-medium">{food}</h3>{" "}
        {/* Displaying food name */}
      </div>
    ));

  // Function to render the results table displaying food servings and costs
  const renderResultsTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-green-600 text-white">
          <tr>
            <th className="p-4 text-left">Food</th>
            <th className="p-4 text-right">Serving</th>
            <th className="p-4 text-right">Cost</th>
          </tr>
        </thead>
        <tbody>
          {selectedFoodNames.map((name, index) => {
            const serving = basicSolution[index]; // Get the serving size for each food
            if (serving !== 0) {
              const cost = (foods[name].price * serving).toFixed(2); // Calculate cost for the serving
              return (
                <tr
                  key={name}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-4">{name}</td> {/* Food name */}
                  <td className="p-4 text-right">{serving}</td>{" "}
                  {/* Serving size */}
                  <td className="p-4 text-right">${cost}</td>{" "}
                  {/* Cost of the serving */}
                </tr>
              );
            }
            return null; // Skip rendering if serving is zero
          })}
        </tbody>
      </table>
    </div>
  );

  // Function to render the mode switch button (Table vs Pie Chart)
  const renderModeSwitchButton = () => (
    <button
      className="bg-green-200 hover:bg-green-300 w-10 h-10 rounded-full flex items-center justify-center shadow"
      onClick={toggleMode} // Toggling between modes
    >
      {mode === "table" ? <PieChartIcon /> : <TableChartIcon />}{" "}
      {/* Display respective icon */}
    </button>
  );

  return (
    <>
      {!viewComputationMode ? ( // If not in computation view
        <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
          {/* Sidebar for selected foods */}
          <div className="flex flex-col md:basis-1/4 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Selected Items
            </h2>
            <div className="flex flex-col h-full gap-4 overflow-hidden hover:overflow-y-auto">
              {renderSelectedFoods()} {/* Rendering the selected foods */}
            </div>
            {!forViewing && ( // If not in viewing mode, show 'New Diet' button
              <button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md"
                onClick={newDiet} // Trigger new diet creation
              >
                New Diet
              </button>
            )}
          </div>

          {/* Main content section */}
          <div
            className="flex flex-col flex-grow p-6 bg-white"
            onClick={() => saving && !hovering && setSaving(false)} // Handle click to stop saving
          >
            {saving && ( // Show save diet modal if saving is true
              <div
                className="absolute place-self-center top-56 flex flex-col items-center gap-4 bg-gray-50 p-5"
                onMouseEnter={() => setHovering(true)} // Set hovering state when mouse enters
                onMouseLeave={() => setHovering(false)} // Reset hovering state when mouse leaves
              >
                <input
                  type="text"
                  value={title} // Value bound to title state
                  placeholder="Enter title..."
                  className="w-80 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setTitle(e.target.value)} // Updating the title state on input change
                  required
                />
                <button
                  className="w-32 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                  onClick={saveDiet} // Saving the diet on click
                >
                  Submit
                </button>
              </div>
            )}

            {/* Header with results */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              {renderModeSwitchButton()} {/* Render mode switch button */}
            </div>

            {/* Display either table or pie chart */}
            {mode === "table" ? (
              renderResultsTable() // Render table view
            ) : (
              <DietPie
                foods={selectedFoodNames}
                serving={basicSolution.slice(1, selectedFoodNames.length)}
                colors={colors} // Pass data to DietPie for pie chart view
              />
            )}

            {/* Cost Summary */}
            <div className="mt-6 text-center text-lg font-medium">
              The cost of this optimal diet is{" "}
              <span className="text-green-600">${Z}</span> per day.
            </div>

            {/* Actions */}
            <div className="flex flex-col items-center mt-16">
              <button
                className="w-52 px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
                onClick={showComputation} // Show computation details
              >
                Show Computation
              </button>
              {!forViewing &&
                user._id && ( // Show save button if user is logged in and not viewing
                  <button
                    className="w-52 mt-5 px-3 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                    onClick={() => setSaving(true)} // Trigger save mode
                  >
                    Save
                  </button>
                )}
              {!user._id && ( // Prompt user to log in to save diet if not logged in
                <h2 className="mt-5 text-center">Login to save your diets!</h2>
              )}
              {forViewing && ( // Show "Back" button if in viewing mode
                <button
                  className="w-52 mt-5 px-3 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                  onClick={goBack} // Go back to previous view
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Computation
          iterationsObj={iterations} // Pass iterations for computation details
          selectedFoodNames={selectedFoodNames} // Pass selected food names for reference
          closeComputation={hideComputation} // Function to close computation view
        />
      )}
    </>
  );
};

export default Diet; // Exporting the Diet component
