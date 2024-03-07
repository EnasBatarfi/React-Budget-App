import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";
import ToastMessage from "./ToastMessage";
type expenseType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};
const expense = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState<expenseType[]>([]);

  const handleSource = (event: ChangeEvent<HTMLInputElement>) => {
    setSource(event.target.value);
  };

  const handleAmount = (event: ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(event.target.value));
  };

  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (source && amount && date) {
      const newExpense = {
        id: uuidv4(),
        source: source,
        amount: amount,
        date: date,
      };

      setExpenses((prevExpensesArray) => [...prevExpensesArray, newExpense]);

      ToastMessage("The expense added successfully", true);

      setSource("");
      setAmount(0);
      setDate("");
    } else {
      ToastMessage("Some data is missing, please check again", false);
    }
  };

  return (
    <section className="expense">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Expense source</label>
          <input
            type="text"
            placeholder="Groceries"
            id="source"
            name="source"
            value={source}
            required
            onChange={handleSource}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of expense</label>
          <input
            type="number"
            placeholder=""
            id="amount"
            name="amount"
            value={amount}
            required
            onChange={handleAmount}
          />
        </div>
        <div>
          <label htmlFor="date">Date of expense</label>
          <input
            type="date"
            placeholder=""
            id="date"
            name="date"
            value={date}
            required
            onChange={handleDate}
          />
        </div>
        <button className="btn">Add expense</button>
      </form>
      <ul>
        {expenses.length > 0 ? (
          expenses.map((expense) => {
            return (
              <li key={expense.id}>
                {expense.source} : {expense.amount} SAR on {expense.date}
              </li>
            );
          })
        ) : (
          <p>No expenses</p>
        )}
      </ul>
    </section>
  );
};

export default expense;
