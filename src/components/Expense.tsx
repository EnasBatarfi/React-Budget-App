// React imports
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// Component import
import ToastMessage from "./ToastMessage";

// Define the type for an expense
type ExpenseType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

// Expense component
const Expense = (props: {
  onExpenseAmountChange: (expenseAmount: number) => void;
  balanceAmount: number;
}) => {
  // State variables
  const [totalExpensesAmount, setTotalExpensesAmount] = useState(0);
  const [expense, setExpense] = useState<ExpenseType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setExpense((prevExpense) => {
      return { ...prevExpense, [event.target.name]: event.target.value };
    });
  };

  // Handle deletion of an expense
  const handleDelete = (id: string | undefined) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(filteredExpenses);
  };

  // Update total expenses amount when expenses change
  useEffect(() => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpensesAmount(total);
    props.onExpenseAmountChange(total);
  }, [expenses]);

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (
      expense.source &&
      expense.amount > 0 &&
      expense.date &&
      props.balanceAmount >= expense.amount
    ) {
      const newExpense: ExpenseType = {
        id: uuidv4(),
        ...expense,
        amount: Number(expense.amount), // To ensure amount is a number
      };

      setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
      ToastMessage("The expense added successfully", true);
      setExpense({
        source: "",
        amount: 0,
        date: "",
      });
    } else {
      if (props.balanceAmount < expense.amount) {
        ToastMessage("Insufficient balance amount", false);
      } else {
        ToastMessage(
          "Some data is missing or the amount is negative, please check again",
          false
        );
      }
    }
  };

  // JSX rendering
  return (
    <section className="expense-section">
      {/* Form for adding expense */}
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            placeholder="Groceries"
            id="source"
            name="source"
            value={expense.source}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of expense</label>
          <input
            type="number"
            placeholder=""
            id="amount"
            name="amount"
            value={expense.amount}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date of expense</label>
          <input
            type="date"
            placeholder=""
            id="date"
            name="date"
            value={expense.date}
            required
            onChange={handleChange}
          />
        </div>
        <button className="btn">Add expense</button>
      </form>

      {/* Display list of expenses */}
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => (
            <li key={expense.id}>
              {expense.source} : {expense.amount} SAR on {expense.date}
              <button onClick={() => handleDelete(expense.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No expenses</p>
        )}
      </ul>
    </section>
  );
};

export default Expense;
