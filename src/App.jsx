import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Income from "./Pages/Income";
import Expense from "./Pages/Expense";
import Cards from "./Components/Cards";

const App = () => {
  return (
    <div className="bg-blue-100 min-h-screen h-full">
      <BrowserRouter>
        <div>
          <Sidebar />
        </div>
        <div className="p-4 sm:ml-40">
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
            <Cards />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/income" element={<Income />} />
              <Route path="/expense" element={<Expense />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
