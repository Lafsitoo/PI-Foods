import React from "react";
import imgDefault from "../img/default.jpg";
import "./../styles/Card.css";

//* COMPONENTE

export default function Card({ name, diets, image }) {
  return (
    <div>
      <h3>{name}</h3>
      <h5>{diets}</h5>
      <div>
        <img
          src={image ? image : imgDefault}
          alt="img not found"
          width="200px"
          height="250px"
        />
      </div>
    </div>
  );
}
