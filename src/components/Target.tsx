import React, { ChangeEvent, FormEvent, useState } from "react";

import ToastMessage from "./ToastMessage";
import Progress from "./Progress";

const Target = (props: { transferAmount: number }) => {
  const [target, setTarget] = useState(0);
  const [currentSaving, setCurrentSaving] = useState(0);
  const [finalTarget, setFinalTarget] = useState(0);
  const handleTarget = (event: ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(event.target.value));
  };

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

  React.useEffect(() => {
    setCurrentSaving(
      (prevCurrentSaving) => prevCurrentSaving + props.transferAmount
    );
  }, [props.transferAmount]);

  return (
    <section className="target-section">
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
      <h1>Current saving</h1>
      <p>{currentSaving}</p>

      <h1>Target</h1>
      <p>{finalTarget}</p>

      <h1>Progress</h1>
      <Progress target={finalTarget} current={currentSaving} />
    </section>
  );
};

export default Target;
