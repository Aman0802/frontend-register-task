import React from "react";
import cx from "classnames";

export function CustomInput(props) {
  const {
    placeholder,
    className,
    value,
    type = "text",
    onChange,
    required = false,
  } = props;
  return (
    <>
      <input
        className={cx(
          "focus:outline-none focus:ring focus:border-blue-300 rounded-md bg-background px-2 py-3 w-full",
          className
        )}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </>
  );
}
