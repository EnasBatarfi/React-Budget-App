// React imports
import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";

// Component imports
import ToastMessage from "./ToastMessage";
import Progress from "./Progress";

const Target = (props: { transferAmount: number }) => {
  // State variables for target, current saving, and final target
  const [target, setTarget] = useState(0);
  const [currentSaving, setCurrentSaving] = useState(0);
  const [finalTarget, setFinalTarget] = useState(0);

  // Function to handle target input change
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(event.target.value));
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (target) {
      ToastMessage("The target is updated successfully", true);
      setFinalTarget(target);
      setTarget(0);
    } else {
      ToastMessage("You cannot add empty target", false);
    }
  };

  // Update current saving when transfer amount changes
  useEffect(() => {
    setCurrentSaving(
      (prevCurrentSaving) => prevCurrentSaving + props.transferAmount
    );
  }, [props.transferAmount]);

  // JSX rendering
  return (
    <section className="target-section">
      {/* Form for setting target */}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="target">Set target</label>
        <input
          type="number"
          placeholder=""
          id="target"
          name="target"
          value={target}
          required
          onChange={handleTarget}
        />
        <button>Reset</button>
      </form>

      {/* Display current saving */}
      <h1>Current saving</h1>
      <p>{currentSaving}</p>

      {/* Display final target */}
      <h1>Target</h1>
      <p>{finalTarget}</p>

      {/* Display progress */}
      <h1>Progress</h1>
      <Progress target={finalTarget} current={currentSaving} />
    </section>
  );
};

export default Target;
