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

  const [expenseAmount, setExpenseAmount] = useState(0);
  const getExpenseAmount = (expenseAmount: number) => {
    setExpenseAmount(expenseAmount);
  };

  const [balanceAmount, setBalanceAmount] = useState(0);
  const getBalanceAmount = (balanceAmount: number) => {
    console.log(balanceAmount);
    setBalanceAmount(balanceAmount);
  };
  return (
    <>
      <ToastContainer />
      <div className="container">
        <Income onIncomeAmountChange={getIncomeAmount} />
        <Expense
          onExpenseAmountChange={getExpenseAmount}
          balanceAmount={balanceAmount}
        />
        <Target />
        <Balance
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
          onBalanceAmountChange={getBalanceAmount}
        />
      </div>
    </>
  );
}

export default App;
