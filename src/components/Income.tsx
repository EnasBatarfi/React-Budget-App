// React imports
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

// Component import
import ToastMessage from "./ToastMessage";

// Define the type for an income
type IncomeType = {
  id?: string;
  source: string;
  amount: number;
  date: string;
};

// Income component
const Income = (props: {
  onIncomeAmountChange: (incomeAmount: number) => void;
}) => {
  // State variables
  const [totalIncomeAmount, setTotalIncomeAmount] = useState(0); // Renamed to totalIncomeAmount
  const [income, setIncome] = useState<IncomeType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [incomes, setIncomes] = useState<IncomeType[]>([]);

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIncome((prevIncome) => {
      return { ...prevIncome, [event.target.name]: event.target.value };
    });
  };

  // Handle deletion of an income
  const handleDelete = (id: string | undefined) => {
    const filteredIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(filteredIncomes);
  };

  // Update total income amount when incomes change
  useEffect(() => {
    const total = incomes.reduce((acc, income) => acc + income.amount, 0);
    setTotalIncomeAmount(total);
    props.onIncomeAmountChange(total);
  }, [incomes]);

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (income.source && income.amount > 0 && income.date) {
      const newIncome: IncomeType = {
        id: uuidv4(),
        ...income,
        amount: Number(income.amount), // To ensure amount is a number
      };
      setIncomes((prevIncomesArray) => [...prevIncomesArray, newIncome]);
      ToastMessage("The income added successfully", true);
      setIncome({
        source: "",
        amount: 0,
        date: "",
      });
    } else {
      ToastMessage(
        "Some data is missing or the amount is negative, please check again",
        false
      );
    }
  };

  // JSX rendering
  return (
    <section className="income-section">
      {/* Form for adding income */}
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="source">Income source</label>
          <input
            type="text"
            placeholder="Salary"
            id="source"
            name="source"
            value={income.source}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount of income</label>
          <input
            type="number"
            placeholder=""
            id="amount"
            name="amount"
            value={income.amount}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="date">Date of income</label>
          <input
            type="date"
            placeholder=""
            id="date"
            name="date"
            value={income.date}
            required
            onChange={handleChange}
          />
        </div>
        <button className="btn">Add income</button>
      </form>

      {/* Display list of incomes */}
      <ul>
        {incomes.length > 0 ? (
          incomes.map((income) => {
            return (
              <li key={income.id}>
                {income.source} : {income.amount} SAR on {income.date}
                <button onClick={() => handleDelete(income.id)}>Delete</button>
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
