import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Income from "./components/Income";
import Expense from "./components/Expense";
import Target from "./components/Target";
import Balance from "./components/Balance";

function App() {
  const [incomeAmount, setIncomeAmount] = useState(0);
  const getIncomeAmount = (incomeAmount: number) => {
    setIncomeAmount(incomeAmount);
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Income onIncomeAmountChange={getIncomeAmount} />
        <Expense />
        <Target />
        <Balance currentIncomeAmount={incomeAmount} />
      </div>
    </>
  );
}

export default App;
