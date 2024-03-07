import React from "react";

const Progress = (props: { target: number; current: number }) => {
  const progress =
    props.target === 0 ? 0 : (props.current / props.target) * 100;

  return (
    <p>
      <progress value={props.current} max={props.target}></progress>
      {progress.toFixed(1)}%
    </p>
  );
};

export default Progress;
