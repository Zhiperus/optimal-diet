import { useState } from "react";
import { DietMaker } from "./components/DietMaker";
import { Navbar } from "./components/Navbar";
import Diets from "./components/Diets";
import Login from "./components/Login";
import Signup from "./components/Signup";

function App() {
  const [tab, setTab] = useState("Diet Maker");
  const handleClick = (tab) => {
    setTab(tab);
  };

  const handleTab = (tab) => {
    switch (tab) {
      case "Diet Maker":
        return <DietMaker />;
      case "Diets":
        return <Diets />;
      case "Login":
        return <Login changeTab={handleClick} />;
      case "Sign Up":
        return <Signup changeTab={handleClick} />;
    }
  };

  return (
    <div className="flex w-screen h-screen bg-gradient-to-b from-gray-50 to-gray-100  ">
      <Navbar changeTab={handleClick} currentTab={tab} />
      {handleTab(tab)}
    </div>
  );
}

export default App;
