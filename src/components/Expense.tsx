import React from "react";
const Expense = () => {
  return (
    <section className="expense">
      <h1>Expense source</h1>
      <input type="text" placeholder="Electricity bill" />
      <h1>Amount of expense</h1>
      <input type="text" placeholder="Salary" />
      <h1>Date of income</h1>
      <input type="date" placeholder="Salary" />
      <button>Add Expense</button>
    </section>
  );
};

export default Expense;
