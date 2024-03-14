// React imports
import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const [expense, setExpense] = useState<ExpenseType>({
    source: "",
    amount: 0,
    date: "",
  });
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [isValidForm, setIsValidForm] = useState(false);
  const [sourceError, setSourceError] = useState("");
  const [amountError, setAmountError] = useState("");

  // Memoize total income calculation
  const totalExpenseAmount = useMemo(() => {
    return expenses.reduce((acc, expense) => acc + expense.amount, 0);
  }, [expenses]);

  // Lifted onIncomeAmountChange function with useCallback
  const onIncomeAmountChangeCallback = useCallback(
    props.onExpenseAmountChange,
    [props.onExpenseAmountChange]
  );

  // Handle input change
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setExpense((prevExpense) => ({ ...prevExpense, [name]: value }));

    if (name === "source" && value.length <= 2)
      setSourceError("Length should be more than 2 characters");
    else setSourceError("");

    if (name === "amount" && Number(value) <= 0)
      setAmountError("Amount should be more than 0");
    else setAmountError("");
  };

  // Handle deletion of an expense
  const handleDelete = (id: string | undefined) => {
    const filteredExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(filteredExpenses);
  };

  // Update total expenses amount when expenses change
  useEffect(() => {
    props.onExpenseAmountChange(totalExpenseAmount);
  }, [expenses]);

  // Validate expense inputs
  useEffect(() => {
    const validate = Object.values(expense).every((value) => value);
    setIsValidForm(validate);
  }, [expense, isValidForm]);

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
          <p className="error-msg">{sourceError}</p>
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
          <p className="error-msg">{amountError}</p>
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
        <button
          className="btn"
          type="submit"
          disabled={isValidForm ? false : true}
        >
          Add expense
        </button>
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
