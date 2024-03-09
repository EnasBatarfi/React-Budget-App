// React imports
import React, { useState } from "react";

// Toast notification imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component imports
import Income from "./components/Income";
import Expense from "./components/Expense";
import Target from "./components/Target";
import Balance from "./components/Balance";

function App() {
  // State variables for income, expense, balance, and transfer amounts
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  // Functions to update state variables when amounts change
  const getIncomeAmount = (incomeAmount: number) => {
    setIncomeAmount(incomeAmount);
  };

  const getExpenseAmount = (expenseAmount: number) => {
    setExpenseAmount(expenseAmount);
  };

  const getBalanceAmount = (balanceAmount: number) => {
    setBalanceAmount(balanceAmount);
  };

  const getTransferAmount = (transferAmount: number) => {
    setTransferAmount(transferAmount);
  };

  return (
    <>
      {/* Toast notification container */}
      <ToastContainer />

      {/* Main container for application */}
      <div className="container">
        {/* Components for income, expense, target, and balance */}
        <Income onIncomeAmountChange={getIncomeAmount} />
        <Expense
          onExpenseAmountChange={getExpenseAmount}
          balanceAmount={balanceAmount}
        />
        <Target transferAmount={transferAmount} />
        <Balance
          incomeAmount={incomeAmount}
          expenseAmount={expenseAmount}
          onBalanceAmountChange={getBalanceAmount}
          onTransferAmount={getTransferAmount}
        />
      </div>
    </>
  );
}

export default App;
