import ClearIcon from "@mui/icons-material/Clear";

export const Computation = ({
  computationProcess,
  selectedFoodNames,
  closeComputation,
}) => {
  const computations = Object.keys(computationProcess).map((key) => {
    return computationProcess[key];
  });

  let iterationCounter = 1;

  return (
    <div className="flex flex-col overflow-x-auto overflow-y-auto gap-10">
      <h1 className="fixed top-0 right-0 m-4 z-10">
        <button
          onClick={closeComputation}
          className="bg-red-500 p-1 rounded-full text-white shadow"
        >
          <ClearIcon />
        </button>
      </h1>

      {computations.map((iteration) => {
        return (
          <div
            className="flex flex-col gap-10"
            key={"iteration-" + iterationCounter + 1}
          >
            <h2>Iteration #{iterationCounter++}</h2>

            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-2 py-1 border text-left">#</th>
                  {selectedFoodNames.map((food) => (
                    <th
                      key={iterationCounter + "-matrix-" + food}
                      className="px-2 py-1 border text-left"
                    >
                      {food}
                    </th>
                  ))}
                  {[
                    ...Array(
                      iteration.tableau[0].length -
                        (selectedFoodNames.length + 2)
                    ),
                  ].map((_, index) => (
                    <th
                      key={iterationCounter + "-matrix-" + `S${index + 1}`}
                      className="px-2 py-1 border text-left"
                    >
                      S{index + 1}
                    </th>
                  ))}
                  <th className="px-2 py-1 border text-left">Z</th>
                  <th className="px-2 py-1 border text-left">Sol'n</th>
                </tr>
              </thead>
              <tbody>
                {iteration.tableau.map((row, rowIndex) => (
                  <tr
                    key={iterationCounter + " " + rowIndex}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="px-2 py-1 border text-left">
                      {rowIndex + 1}
                    </td>
                    {row.map((cell, cellIndex) => (
                      <td
                        key={iterationCounter + " " + cellIndex}
                        className="px-2 py-1 border text-left"
                      >
                        {cell.toExponential ? cell.toExponential(4) : cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>

            <table className="min-w-full table-auto border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="px-2 py-1 border text-left">#</th>
                  {selectedFoodNames.map((food) => (
                    <th
                      key={iterationCounter + "-basicSolution-" + food}
                      className="px-2 py-1 border text-left"
                    >
                      {food}
                    </th>
                  ))}
                  {[
                    ...Array(
                      iteration.tableau[0].length -
                        (selectedFoodNames.length + 2)
                    ),
                  ].map((_, index) => (
                    <th
                      key={
                        iterationCounter + "-basicSolution-" + `S${index + 1}`
                      }
                      className="px-2 py-1 border text-left"
                    >
                      S{index + 1}
                    </th>
                  ))}
                  <th className="px-2 py-1 border text-left">Z</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-2 py-1 border text-left">1</td>
                  {iteration.basicSolution.map((cell, cellIndex) => (
                    <td
                      key={iterationCounter + " " + cellIndex}
                      className="px-2 py-1 border text-left"
                    >
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
