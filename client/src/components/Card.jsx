import React from "react";
import imgDefault from "../resources/default.jpg";
import "./../styles/Card.css";

//* COMPONENTE

export default function Card({ name, diets, image }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <div>
        <img
          src={image ? image : imgDefault}
          alt="img not found"
        />
      </div>
    </div>
  );
}
