import React from "react";
const Progress = (props: { target: number; current: number }) => {
  return (
    <p>
      <progress value={props.current} max={props.target}></progress>
      {((props.current / props.target) * 100).toFixed(1)}%
    </p>
  );
};

export default Progress;
