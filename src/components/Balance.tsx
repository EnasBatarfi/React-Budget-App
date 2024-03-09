// React imports
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

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
  const [balance, setBalance] = useState(0);
  const [savingAmount, setSavingAmount] = useState(0); // State to hold saving amount

  // Handle transfer input change
  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    setTransfer(Number(event.target.value));
  };

  // Handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (transfer && transfer <= balance) {
      ToastMessage("The amount is transferred successfully", true);
      setBalance((prevBalance) => prevBalance - transfer);
      setSavingAmount((prevSavingAmount) => prevSavingAmount + transfer); // Add transferred amount to saving
      props.onTransferAmount(transfer);
      setTransfer(0);
    } else {
      if (transfer > balance) {
        ToastMessage("Insufficient balance amount", false);
      } else {
        ToastMessage("You cannot transfer zero amount", false);
      }
    }
  };

  // Update balance and saving amount when income, expense, or saving amount changes
  useEffect(() => {
    const calculatedBalance =
      props.incomeAmount - props.expenseAmount - savingAmount; // Use saving amount in the calculation
    setBalance(calculatedBalance);
    props.onBalanceAmountChange(calculatedBalance);
  }, [props.incomeAmount, props.expenseAmount, savingAmount]);

  // JSX rendering
  return (
    <section className="balance-section">
      {/* Display current balance and saving amount */}
      <h1>Current balance</h1>
      <p>{balance || 0}</p>
      <p>Saving amount: {savingAmount}</p>

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
        <button>Transfer</button>
      </form>
    </section>
  );
};

export default Balance;
