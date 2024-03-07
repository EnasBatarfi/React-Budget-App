import React, { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import ToastMessage from "./ToastMessage";

type incomeType = { id?: string; source: string; amount: number; date: string };
const Income = () => {
  const [source, setSource] = useState("");
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [incomes, setIncomes] = useState<incomeType[]>([]);

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
      const newIncome = {
        id: uuidv4(),
        source: source,
        amount: amount,
        date: date,
      };

      setIncomes((prevIncomesArray) => [...prevIncomesArray, newIncome]);

      ToastMessage("The income added successfully", true);

      setSource("");
      setAmount(0);
      setDate("");
    } else {
      ToastMessage("Some data is missing, please check again", false);
    }
  };

  return (
    <section className="income-section">
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            placeholder="Salary"
            id="source"
            name="source"
            value={source}
            required
            onChange={handleSource}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of income</label>
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
          <label htmlFor="date">Date of income</label>
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
        <button className="btn">Add income</button>
      </form>
      <ul>
        {incomes.length > 0 ? (
          incomes.map((income) => {
            return (
              <li key={income.id}>
                {income.source} : {income.amount} SAR on {income.date}
              </li>
            );
          })
        ) : (
          <p>No incomes</p>
        )}
      </ul>
    </section>
  );
};

export default Income;
