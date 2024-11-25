import React, { useState } from "react";
import { DietCard } from "./DietCard";
import { useSelector } from "react-redux";
import Diet from "./Diet";

const Diets = () => {
  const [view, setView] = useState(false);
  const [data, setData] = useState({});
  const user = useSelector((state) => state.user.value);

  return (
    <>
      {user._id === "" ? (
        <h2 className="flex justify-center items-center w-screen h-screen ">
          Login to view your diets!
        </h2>
      ) : !view ? (
        <div className="flex flex-col w-screen h-screen bg-gray-100 pl-14">
          <h1 className="flex font-bold text-3xl justify-center mt-5">
            Saved Diets
          </h1>
          <button className="flex place-self-end mr-20 p-2 mb-10 rounded-3xl bg-gray-300">
            Select Diets
          </button>
          <div className="grid grid-cols-4 gap-5">
            {user.diets.map((diet) => {
              return (
                <DietCard
                  key={1}
                  date={diet.date}
                  price={diet.Z}
                  data={diet}
                  setView={setView}
                  setData={setData}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <Diet
          selectedFoodNames={data.selectedFoodNames}
          basicSolution={data.basicSolution}
          Z={data.Z}
          colors={data.colors}
          iterations={data.iterations}
          forViewing={true}
          setView={setView}
        />
      )}
    </>
  );
};

export default Diets;
