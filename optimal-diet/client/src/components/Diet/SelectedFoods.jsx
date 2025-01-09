import React from "react";
import foods from "../../lib/foods";

export const SelectedFoods = ({
  selectedFoodNames,
  resetSelection,
  forViewing,
}) => (
  <>
    <h2 className="text-xl font-bold mb-4 text-center">Selected Items</h2>
    <div className="flex flex-col h-full gap-4 overflow-hidden hover:overflow-y-auto">
      {selectedFoodNames.map((food) => (
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
      ))}
    </div>
    {!forViewing && (
      <button
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md"
        onClick={resetSelection}
      >
        New Diet
      </button>
    )}
  </>
);
