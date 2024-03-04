import React from "react";
const Balance = () => {
  return (
    <section className="balance">
      <h1>Current balance</h1>
      <p>0</p>
      <form action="">
        <label htmlFor="transfer">Transfer to saving account</label>
        <input type="number" placeholder="" required />
        <button>Transfer</button>
      </form>
    </section>
  );
};

export default Balance;
