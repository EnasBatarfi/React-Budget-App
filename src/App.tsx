import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Income from "./components/Income";
import Expense from "./components/Expense";
import Target from "./components/Target";
import Balance from "./components/Balance";

function App() {
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Income />
        <Expense />
        <Target />
        <Balance />
      </div>
    </>
  );
}

export default App;
