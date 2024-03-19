import { createContext } from "react";

// Define type for the context data
type BudgetContextType = {
  incomeAmount: number;
  setIncomeAmount: (amount: number) => void;
  expenseAmount: number;
  setExpenseAmount: (amount: number) => void;
  balanceAmount: number;
  setBalanceAmount: (amount: number) => void;
  transferAmount: number; // Define the transferAmount property
  setTransferAmount: (amount: number) => void;
};

// Create context with the defined type
export const BudgetContext = createContext<BudgetContextType>({
  incomeAmount: 0,
  setIncomeAmount: () => {},
  expenseAmount: 0,
  setExpenseAmount: () => {},
  balanceAmount: 0,
  setBalanceAmount: () => {},
  transferAmount: 0,
  setTransferAmount: () => {},
});
