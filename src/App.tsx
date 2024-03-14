// React imports
import React from "react";
// React Router imports
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Import components and styles
import Home from "./pages/Home";
import Budget from "./pages/Budget";
import "./index.css";

const App = () => {
  return (
    // Wrap the application with BrowserRouter for routing
    <BrowserRouter>
      {/* Define routes for different pages */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the budget page */}
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
