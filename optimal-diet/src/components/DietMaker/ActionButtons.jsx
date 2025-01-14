import React from "react";

export const ActionButtons = ({
  isAFoodSelected,
  handleSubmit,
  resetSelections,
  selectAllFoods,
}) => {
  return (
    <div className="flex h-10 justify-between items-center mb-4">
      <h2 className="italic text-lg text-gray-700">
        Select items for your diet...
      </h2>
      <div className="flex gap-5">
        {isAFoodSelected && (
          <>
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
              onClick={handleSubmit}
            >
              Done
            </button>
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
              onClick={resetSelections}
            >
              Reset
            </button>
          </>
        )}
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md"
          onClick={selectAllFoods}
        >
          Select All
        </button>
      </div>
    </div>
  );
};
