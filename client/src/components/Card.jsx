import React from "react";
import imgDefault from "../img/default.jpg";

export default function Card({ name, diet, image }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{diet}</h5>
      <img
        src={image ? image : imgDefault}
        alt="img not found"
        width="200px"
        height="250px"
      />
    </div>
  );
}
