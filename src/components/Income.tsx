// React imports
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
  const [income, setIncome] = useState<IncomeType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [incomes, setIncomes] = useState<IncomeType[]>([]);
  const [isValidForm, setIsValidForm] = useState(false);
  const [sourceError, setSourceError] = useState("");
  const [amountError, setAmountError] = useState("");

  // Memoize total income calculation
  const totalIncomeAmount = useMemo(() => {
    return incomes.reduce((acc, income) => acc + income.amount, 0);
  }, [incomes]);

  // Lifted onIncomeAmountChange function with useCallback
  const onIncomeAmountChangeCallback = useCallback(props.onIncomeAmountChange, [
    props.onIncomeAmountChange,
  ]);

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setIncome((prevIncome) => ({ ...prevIncome, [name]: value }));

    if (name === "source") {
      if (value.trim().length === 0) {
        setSourceError("Source cannot be empty");
      } else if (value.length < 3) {
        setSourceError("Length should be more than 2 characters");
      } else {
        setSourceError("");
      }
    }

    if (name === "amount" && Number(value) <= 0)
      setAmountError("Amount should be more than 0");
    else setAmountError("");
  };

  // Handle deletion of an income
  const handleDelete = (id: string | undefined) => {
    const filteredIncomes = incomes.filter((income) => income.id !== id);
    setIncomes(filteredIncomes);
  };

  // Update total income amount when incomes change
  useEffect(() => {
    props.onIncomeAmountChange(totalIncomeAmount);
  }, [incomes]);

  // Validate income inputs
  useEffect(() => {
    const validate =
      Object.values(income).every((value) => value) &&
      !sourceError &&
      !amountError;
    setIsValidForm(validate);
  }, [income, sourceError]);

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
          <p className="error-msg">{sourceError}</p>
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
          <p className="error-msg">{amountError}</p>
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
        <button
          className="btn"
          type="submit"
          disabled={isValidForm ? false : true}
        >
          Add income
        </button>
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
