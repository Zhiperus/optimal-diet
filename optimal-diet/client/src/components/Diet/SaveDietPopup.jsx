import React from "react";

export const SaveDietPopup = ({ title, setTitle, saveDiet, closePopup }) => (
  <div
    className="absolute place-self-center top-56 flex flex-col items-center gap-4 bg-gray-50 p-5"
    onMouseLeave={closePopup}
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
);
