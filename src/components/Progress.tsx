// React import
import React from "react";

// Progress component to display progress bar
const Progress = (props: { target: number; current: number }) => {
  // Calculate progress percentage
  const progress =
    props.target === 0 ? 0 : (props.current / props.target) * 100;

  return (
    <p>
      {/* Display progress bar */}
      <progress value={props.current} max={props.target}></progress>
      {/* Display progress percentage */}
      {progress.toFixed(1)}%
    </p>
  );
};

export default Progress;
