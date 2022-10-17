import React from "react";
import { Link } from "react-router-dom";
import "./../styles/LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <h1>BIENVENIDO</h1>
      <h3>Menu de Recetas</h3>
      <Link to="/home">
        <button>Ingresar</button>
      </Link>
    </div>
  );
}
