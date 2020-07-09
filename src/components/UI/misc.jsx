import React from "react";
import { Link } from "react-router-dom";

export const Tag = props => {
  const Template = (
    <div
      style={{
        background: props.bck,
        fontSize: props.size,
        color: props.color,
        padding: "5px 10px",
        display: "inline-block",
        fontFamily: "Righteous"
      }}
    >
      {props.children}
    </div>
  );
  if (props.link) {
    return <Link to={props.linkto}>{Template}</Link>;
  } else {
    return Template;
  }
};

export const firbaseLooper = response => {
  let data = [];
  response.forEach(child => {
    data.push({
      ...child.val(),
      id: child.key
    });
  }); // end of for each method
  return data;
};

export const reverseArray = actualArray => {
  let reversedArray = [];
  for (let i = actualArray.length - 1; i > 0; i--) {
    reversedArray.push(actualArray[i]);
  }
  return reversedArray;
};

export const validate = element => {
  let error = [true, ""];
  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? "Email must be valid" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== "";
    const message = `${!valid ? "this field is required" : ""}`;
    error = !valid ? [valid, message] : error;
  }
  return error;
};
