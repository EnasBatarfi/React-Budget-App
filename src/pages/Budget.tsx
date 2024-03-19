// React imports
import React, { useState } from "react";

// Toast notification imports
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Component imports
import Income from "../components/Income";
import Expense from "../components/Expense";
import Target from "../components/Target";
import Balance from "../components/Balance";
import { BudgetContext } from "../context/Context";

function Budget() {
  // State variables for income, expense, balance, and transfer amounts
  const [incomeAmount, setIncomeAmount] = useState(0);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [balanceAmount, setBalanceAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);

  return (
    <BudgetContext.Provider
      value={{
        incomeAmount,
        setIncomeAmount,
        expenseAmount,
        setExpenseAmount,
        balanceAmount,
        setBalanceAmount,
        transferAmount,
        setTransferAmount,
      }}
    >
      {/* Toast notification container */}
      <ToastContainer />

      {/* Main container for application */}
      <main className="container">
        {/* Components for income, expense, target, and balance */}
        <Income />
        <Expense />
        <Target />
        <Balance />
      </main>
    </BudgetContext.Provider>
  );
}

export default Budget;
