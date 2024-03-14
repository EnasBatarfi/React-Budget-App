// React imports
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

// Component import
import ToastMessage from "./ToastMessage";

// Balance component
const Balance = (props: {
  incomeAmount: number;
  expenseAmount: number;
  onBalanceAmountChange: (balanceAmount: number) => void;
  onTransferAmount: (transferAmount: number) => void;
}) => {
  // State variables
  const [transfer, setTransfer] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0); // State to hold saving amount
  // Error handling variables
  const [isValidForm, setIsValidForm] = useState(false);
  const [transferError, setTransferError] = useState("");

  // Memoize balance calculation
  const balance = useMemo(() => {
    return props.incomeAmount - props.expenseAmount - savingAmount;
  }, [props.incomeAmount, props.expenseAmount, savingAmount]);

  // Handle transfer input change
  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    const newTransfer = Number(event.target.value);
    setTransfer(newTransfer);

    if (newTransfer > balance || newTransfer < 0)
      setTransferError("Insufficient balance amount");
    else setTransferError("");
  };

  // Handle form submission
  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault();
      const isConfirmed = confirm(
        `Are you sure you want to transfer ${transfer} SAR`
      );
      if (isConfirmed) {
        if (transfer && transfer <= balance) {
          // Update balance and saving amount
          ToastMessage("The amount is transferred successfully", true);
          setSavingAmount((prevSavingAmount) => prevSavingAmount + transfer);
          // Trigger transfer amount callback
          props.onTransferAmount(transfer);
          setTransfer(0);
        } else {
          // Handle invalid transfer
          if (transfer > balance) {
            ToastMessage("Insufficient balance amount", false);
          } else {
            ToastMessage("You cannot transfer zero amount", false);
          }
        }
      }
    },
    [balance, transfer, props.onTransferAmount]
  );

  // Update balance and saving amount when income, expense, or saving amount changes
  useEffect(() => {
    props.onBalanceAmountChange(balance);
  }, [props.incomeAmount, props.expenseAmount, savingAmount]);

  // Validate transfer inputs
  useEffect(() => {
    setIsValidForm(transfer > 0 && transfer <= balance && transferError === "");
  }, [transfer, balance, transferError]);

  // JSX rendering
  return (
    <section className="balance-section">
      {/* Display current balance and saving amount */}
      <h1>Current balance</h1>
      <p>{balance || 0}</p>
      {/* Form for transferring amount */}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="transfer">Transfer to saving account</label>
        <input
          type="number"
          placeholder=""
          id="transfer"
          name="transfer"
          value={transfer}
          required
          onChange={handleTransfer}
        />
        <p className="error-msg">{transferError}</p>
        <button
          className="btn"
          type="submit"
          disabled={isValidForm ? false : true}
        >
          Transfer
        </button>
      </form>
    </section>
  );
};

export default Balance;
