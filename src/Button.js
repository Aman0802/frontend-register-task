import React from "react";

export function Button(props) {
  const { children, classes, onClick } = props;
  return (
    <button className={classes} onClick={onClick}>
      <span className="mx-auto whitespace-nowrap">{children}</span>
    </button>
  );
}
