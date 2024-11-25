import React, { useState } from "react";
import foods from "../foods/foods";
import DietPie from "./DietPie";
import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";
import Computation from "./Computation";
import { useDispatch, useSelector } from "react-redux";
import { addDiet } from "../states/user/userSlice";
import { uid } from "uid/single";

const Diet = ({
  selectedFoodNames,
  basicSolution,
  Z,
  colors,
  iterations,
  newDiet,
  forViewing,
  setView,
}) => {
  const user = useSelector((state) => state.user.value);
  const [mode, setMode] = useState("table");
  const [saving, setSaving] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [title, setTitle] = useState("");
  const [viewComputationMode, setViewComputationMode] = useState(false);
  const dispatch = useDispatch();

  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "table" ? "pie" : "table"));

  const showComputation = () => setViewComputationMode(true);

  const hideComputation = () => setViewComputationMode(false);

  const saveDiet = () => {
    dispatch(
      addDiet({
        UID: uid(),
        title,
        selectedFoodNames,
        basicSolution,
        Z,
        colors,
        iterations,
        date: new Date().toDateString(),
      })
    );
  };

  const goBack = () => setView(false);

  const renderSelectedFoods = () =>
    selectedFoodNames.map((food) => (
      <div
        key={food}
        className="flex items-center gap-4 bg-gray-700 rounded-lg p-2 shadow"
      >
        <img
          className="w-12 h-12 rounded-md object-cover"
          src={foods[food].image}
          alt={food}
        />
        <h3 className="flex-grow text-sm font-medium">{food}</h3>
      </div>
    ));

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
            const serving = basicSolution[index];
            if (serving !== 0) {
              const cost = (foods[name].price * serving).toFixed(2);
              return (
                <tr
                  key={name}
                  className="border-t hover:bg-gray-100 transition"
                >
                  <td className="p-4">{name}</td>
                  <td className="p-4 text-right">{serving}</td>
                  <td className="p-4 text-right">${cost}</td>
                </tr>
              );
            }
            return null;
          })}
        </tbody>
      </table>
    </div>
  );

  const renderModeSwitchButton = () => (
    <button
      className="bg-green-200 hover:bg-green-300 w-10 h-10 rounded-full flex items-center justify-center shadow"
      onClick={toggleMode}
    >
      {mode === "table" ? <PieChartIcon /> : <TableChartIcon />}
    </button>
  );

  return (
    <>
      {!viewComputationMode ? (
        <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
          {/* Sidebar */}
          <div className="flex flex-col md:basis-1/4 bg-gray-800 text-white p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              Selected Items
            </h2>
            <div className="flex flex-col h-full gap-4 overflow-hidden hover:overflow-y-auto">
              {renderSelectedFoods()}
            </div>
            {!forViewing && (
              <button
                className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md"
                onClick={newDiet}
              >
                New Diet
              </button>
            )}
          </div>

          {/* Main Content */}
          <div
            className="flex flex-col flex-grow p-6 bg-white"
            onClick={() => saving && !hovering && setSaving(false)}
          >
            {saving && (
              <div
                className="absolute place-self-center top-56 flex flex-col items-center gap-4 bg-gray-50 p-5"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
              >
                <input
                  type="text"
                  value={title}
                  placeholder="Enter title..."
                  className="w-80 p-3 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-green-500"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
                <button
                  className="w-32 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200"
                  onClick={saveDiet}
                >
                  Submit
                </button>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Results</h2>
              {renderModeSwitchButton()}
            </div>

            {/* Results */}
            {mode === "table" ? (
              renderResultsTable()
            ) : (
              <DietPie
                foods={selectedFoodNames}
                serving={basicSolution.slice(1, selectedFoodNames.length)}
                colors={colors}
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
                onClick={showComputation}
              >
                Show Computation
              </button>
              {!forViewing && user._id && (
                <button
                  className="w-52 mt-5 px-3 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                  onClick={() => setSaving(true)}
                >
                  Save
                </button>
              )}
              {!user._id && (
                <h2 className="mt-5 text-center">Login to save your diets!</h2>
              )}
              {forViewing && (
                <button
                  className="w-52 mt-5 px-3 py-1 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
                  onClick={goBack}
                >
                  Back
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <Computation
          iterationsObj={iterations}
          selectedFoodNames={selectedFoodNames}
          closeComputation={hideComputation}
        />
      )}
    </>
  );
};

export default Diet;
