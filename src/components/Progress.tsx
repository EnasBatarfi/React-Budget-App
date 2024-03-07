import React from "react";
const Progress = (props: { target: number; current: number }) => {
  return (
    <progress value={props.current} max={props.target}>
      {props.current}%
    </progress>
  );
};

export default Progress;
