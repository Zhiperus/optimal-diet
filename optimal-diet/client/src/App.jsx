import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import { Navbar } from "./components/Navbar";
import { DietListsRouter } from "./components/DietLists/DietListsRouter";
import { DietMakerRouter } from "./components/DietMaker/DietMakerRouter";

function App() {
  return (
    <div className="flex w-screen h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />
      <Routes>
        <Route path="/" index element={<DietMakerRouter />} />
        <Route path="/dietmaker/*" element={<DietMakerRouter />} />
        <Route path="/dietlists/*" element={<DietListsRouter />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
