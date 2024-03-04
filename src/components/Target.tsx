import React from "react";
import Progress from "./Progress";
const Target = () => {
  return (
    <section className="target">
      <form action="">
        <label htmlFor="target">Set target</label>
        <input type="number" placeholder="" required />
        <button>Reset</button>
      </form>

      <h1>Current saving</h1>
      <p>0</p>

      <h1>Target</h1>
      <p>0</p>

      <h1>Progress</h1>
      <Progress />
    </section>
  );
};

export default Target;
