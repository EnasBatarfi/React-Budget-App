import React from "react";
const Target = () => {
  return (
    <section className="target">
      <h1>Set target</h1>
      <input type="text" placeholder="" />
      <button>Reset</button>

      <h1>Current saving</h1>
      <p>0</p>

      <h1>Target</h1>
      <p>0</p>

      <h1>Progress</h1>
      <p>0%</p>
    </section>
  );
};

export default Target;
