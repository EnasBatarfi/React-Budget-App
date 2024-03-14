// React imports
import React from "react";
// Importing Link component for navigation
import { Link } from "react-router-dom";

function Home() {
  return (
    // Main container for home page
    <div className="home-container">
      {/* Text container */}
      <div className="text-container">
        {/* Welcome message */}
        <h1 className="home-header">Welcome to Our App!</h1>
        {/* Button to navigate to the budget */}
        <Link to="/budget" className="home-btn">
          Go to Budget
        </Link>
      </div>
    </div>
  );
}

export default Home;
