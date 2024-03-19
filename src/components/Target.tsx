// React imports
import React, {
  ChangeEvent,
  FormEvent,
  useState,
  useEffect,
  useContext,
} from "react";

// Component imports
import ToastMessage from "./ToastMessage";
import Progress from "./Progress";
import { BudgetContext } from "../context/Context";

const Target = () => {
  // State variables for target, current saving, and final target
  const { transferAmount } = useContext(BudgetContext);
  const [target, setTarget] = useState(0);
  const [finalTarget, setFinalTarget] = useState(0);

  // Function to handle target input change
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(event.target.value));
  };

  // Function to handle form submission
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const isConfirmed = confirm("Are you sure you want to update the target?");
    if (isConfirmed) {
      if (target) {
        ToastMessage("The target is updated successfully", true);
        setFinalTarget(target);
        setTarget(0);
      } else {
        ToastMessage("You cannot add empty target", false);
      }
    }
  };

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
        <button>Update</button>
      </form>

      {/* Display current saving */}
      <h1>Current saving</h1>
      <p>{transferAmount}</p>

      {/* Display final target */}
      <h1>Target</h1>
      <p>{finalTarget}</p>

      {/* Display progress */}
      <h1>Progress</h1>
      <Progress target={finalTarget} current={transferAmount} />
    </section>
  );
};

export default Target;
