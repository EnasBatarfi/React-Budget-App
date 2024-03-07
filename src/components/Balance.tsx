import React, { ChangeEvent, FormEvent, useState } from "react";

import ToastMessage from "./ToastMessage";

const Balance = (props: {
  incomeAmount: number;
  expenseAmount: number;
  onBalanceAmountChange: (balanceAmount: number) => void;
  onTransferAmount: (transferAmount: number) => void;
}) => {
  const [transfer, setTransfer] = useState(0);
  const [balance, setBalance] = useState(0);

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    setTransfer(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (transfer && transfer <= balance) {
      ToastMessage("The amount is transferred successfully", true);
      setBalance((prevBalance) => prevBalance - transfer);
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

  React.useEffect(() => {
    setBalance((prevBalance) => prevBalance + props.incomeAmount);
  }, [props.incomeAmount]);

  React.useEffect(() => {
    setBalance((prevBalance) => prevBalance - props.expenseAmount);
  }, [props.expenseAmount]);

  React.useEffect(() => {
    props.onBalanceAmountChange(balance);
  }, [balance]);

  return (
    <section className="balance-section">
      <h1>Current balance</h1>
      <p>{balance || 0}</p>
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
