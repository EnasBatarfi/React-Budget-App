import React from "react";
const Income = () => {
  return (
    <section className="income">
      <form action="">
        <div>
          <label htmlFor="source">Income source</label>
          <input type="text" placeholder="Salary" required />
        </div>
        <div>
          <label htmlFor="amount">Amount of income</label>
          <input type="number" placeholder="" required />
        </div>
        <div>
          <label htmlFor="date">Date of income</label>
          <input type="date" placeholder="" required />
        </div>
        <button className="btn">Add income</button>
      </form>
    </section>
  );
};

export default Income;
