import React from "react";
import Income from "./components/Income";
import Expense from "./components/Expense";
import Target from "./components/Target";
import Balance from "./components/Balance";

function App() {
  return (
    <div className="container">
      <Income />
      <Expense />
      <Target />
      <Balance />
    </div>
  );
}

export default App;
