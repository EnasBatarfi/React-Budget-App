import React from "react";
const Income = () => {
  return (
    <section className="income">
      <h1>Income source</h1>
      <input type="text" placeholder="Salary" />
      <h1>Amount of income</h1>
      <input type="text" placeholder="" />
      <h1>Date of income</h1>
      <input type="date" placeholder="" />
      <button>Add income</button>
    </section>
  );
};

export default Income;
