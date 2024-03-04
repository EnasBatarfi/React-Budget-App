import React from "react";
const Expense = () => {
  return (
    <section className="expense">
      <form action="">
        <div>
          <label htmlFor="source">Expense source</label>
          <input type="text" placeholder="Electricity bill" required />
        </div>
        <div>
          <label htmlFor="amount">Amount of expense</label>
          <input type="number" placeholder="" required />
        </div>
        <div>
          <label htmlFor="date">Date of expense</label>
          <input type="date" placeholder="" required />
        </div>

        <button>Add Expense</button>
      </form>
    </section>
  );
};

export default Expense;
