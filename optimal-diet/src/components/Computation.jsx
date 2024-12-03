import ClearIcon from "@mui/icons-material/Clear";

// Component to display computation iterations
const Computation = ({
  iterationsObj, // Object containing iteration data
  selectedFoodNames, // Array of selected food names for table headers
  closeComputation, // Callback function to close the computation display
}) => {
  // Log the input iterations object for debugging
  console.log(iterationsObj);

  // Convert the iterations object into an array
  const iterations = Object.keys(iterationsObj).map((key) => {
    return iterationsObj[key];
  });

  let iterationCounter = 1; // Counter to display iteration numbers

  return (
    <div className="flex flex-col overflow-x-auto overflow-y-auto gap-10">
      {/* Close button fixed at the top-right */}
      <h1 className="fixed top-0 right-0 m-4 z-10">
        <button
          onClick={closeComputation} // Trigger close function on click
          className="bg-red-500 p-1 rounded-full text-white shadow"
        >
          <ClearIcon />
        </button>
      </h1>

      {/* Loop through each iteration */}
      {iterations.map((iteration) => {
        return (
          <div className="flex flex-col gap-10" key={""}>
            {/* Display iteration number */}
            <h2>Iteration #{iterationCounter++}</h2>

            {/* Table for the tableau data */}
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  {/* Row header: index, food names, slack variables, Z, and solution */}
                  <th className="px-2 py-1 border text-left">#</th>
                  {selectedFoodNames.map((food) => (
                    <th key={food} className="px-2 py-1 border text-left">
                      {food}
                    </th>
                  ))}
                  {/* Generate headers for slack variables dynamically */}
                  {[
                    ...Array(
                      iteration.tableau[0].length -
                        (selectedFoodNames.length + 2)
                    ),
                  ].map((_, index) => (
                    <th key={index} className="px-2 py-1 border text-left">
                      S{index + 1}
                    </th>
                  ))}
                  {/* Headers for Z and Solution columns */}
                  <th className="px-2 py-1 border text-left">Z</th>
                  <th className="px-2 py-1 border text-left">Sol'n</th>
                </tr>
              </thead>
              <tbody>
                {/* Map rows of the tableau */}
                {iteration.tableau.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b hover:bg-gray-50">
                    {/* Row index */}
                    <td className="px-2 py-1 border text-left">
                      {rowIndex + 1}
                    </td>
                    {/* Display each cell in the row */}
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-2 py-1 border text-left"
                      >
                        {/* Format numbers using exponential notation if applicable */}
                        {cell.toExponential ? cell.toExponential(4) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Table for the basic solution */}
            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  {/* Column headers similar to the tableau */}
                  <th className="px-2 py-1 border text-left">#</th>
                  {selectedFoodNames.map((food) => (
                    <th key={food} className="px-2 py-1 border text-left">
                      {food}
                    </th>
                  ))}
                  {/* Dynamic slack variable headers */}
                  {[
                    ...Array(
                      iteration.tableau[0].length -
                        (selectedFoodNames.length + 2)
                    ),
                  ].map((_, index) => (
                    <th key={index} className="px-2 py-1 border text-left">
                      S{index + 1}
                    </th>
                  ))}
                  {/* Z column header */}
                  <th className="px-2 py-1 border text-left">Z</th>
                </tr>
              </thead>
              <tbody>
                {/* Basic solution row */}
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1 border text-left">1</td>
                  {/* Map and format basic solution values */}
                  {iteration.basicSolution.map((cell, cellIndex) => (
                    <td key={cellIndex} className="px-2 py-1 border text-left">
                      {cell.toExponential ? cell.toExponential(4) : cell}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default Computation;
