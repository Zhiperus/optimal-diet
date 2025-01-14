import React from "react";

export const ResultsTable = ({ selectedFoodNames, foodsServing, foods }) => (
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
          const serving = foodsServing[index];
          if (serving !== 0) {
            const cost = (foods[name].price * serving).toFixed(2);
            return (
              <tr key={name} className="border-t hover:bg-gray-100 transition">
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
