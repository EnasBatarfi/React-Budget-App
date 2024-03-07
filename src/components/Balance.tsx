import React, { ChangeEvent, FormEvent, useState } from "react";

import ToastMessage from "./ToastMessage";

const Balance = () => {
  const [transfer, setTransfer] = useState(0);

  const handleTransfer = (event: ChangeEvent<HTMLInputElement>) => {
    setTransfer(Number(event.target.value));
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (transfer) {
      ToastMessage("The amount is transferred successfully", true);
      setTransfer(0);
    } else {
      ToastMessage("You cannot transfer zero amount", false);
    }
  };
  return (
    <section className="balance-section">
      <h1>Current balance</h1>
      <p>0</p>
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
