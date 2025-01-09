import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDiet } from "../../states/user/userSlice";
import { uid } from "uid/single";

import { SelectedFoods } from "./SelectedFoods";
import { ResultsTable } from "./ResultsTable";
import { SaveDietPopup } from "./SaveDietPopup";
import { Computation } from "./Computation";
import { DietPie } from "./DietPie";

import PieChartIcon from "@mui/icons-material/PieChart";
import TableChartIcon from "@mui/icons-material/TableChart";

import foods from "../../lib/foods";

export const Diet = ({
  selectedFoodNames,
  foodsServing,
  cost,
  computationProcess,
  resetSelection,
  forViewing,
  setView,
}) => {
  const user = useSelector((state) => state.user.value);
  const [mode, setMode] = useState("table");
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState("");
  const [viewComputationMode, setViewComputationMode] = useState(false);

  const dispatch = useDispatch();

  const toggleMode = () =>
    setMode((prevMode) => (prevMode === "table" ? "pie" : "table"));

  const saveDiet = () => {
    dispatch(
      addDiet({
        UID: uid(),
        title,
        selectedFoodNames,
        foodsServing,
        cost,
        computationProcess,
        date: new Date().toDateString(),
      })
    );
    setSaving(false);
  };

  if (viewComputationMode) {
    return (
      <Computation
        computationProcess={computationProcess}
        selectedFoodNames={selectedFoodNames}
        closeComputation={() => setViewComputationMode(false)}
      />
    );
  }

  return (
    <div className="flex flex-col md:flex-row w-full h-screen bg-gray-100">
      <div className="flex flex-col md:basis-1/4 bg-gray-800 text-white p-6">
        <SelectedFoods
          selectedFoodNames={selectedFoodNames}
          resetSelection={resetSelection}
          forViewing={forViewing}
        />
      </div>

      <div className="flex flex-col flex-grow p-6 bg-white">
        {saving && (
          <SaveDietPopup
            title={title}
            setTitle={setTitle}
            saveDiet={saveDiet}
            closePopup={() => setSaving(false)}
          />
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Results</h2>
          <button
            className="bg-green-200 hover:bg-green-300 w-10 h-10 rounded-full flex items-center justify-center shadow"
            onClick={toggleMode}
          >
            {mode === "table" ? <PieChartIcon /> : <TableChartIcon />}
          </button>
        </div>

        {mode === "table" ? (
          <ResultsTable
            selectedFoodNames={selectedFoodNames}
            foodsServing={foodsServing}
            foods={foods}
          />
        ) : (
          <DietPie
            foods={selectedFoodNames}
            serving={foodsServing.slice(0, selectedFoodNames.length)}
          />
        )}

        <div className="mt-6 text-center text-lg font-medium">
          The cost of this optimal diet is{" "}
          <span className="text-green-600">${cost}</span> per day.
        </div>

        <div className="flex flex-col items-center mt-16">
          <button
            className="w-52 px-3 py-1 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
            onClick={() => setViewComputationMode(true)}
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
              onClick={() => setView(false)}
            >
              Back
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
