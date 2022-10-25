import React from "react";
import { Link } from "react-router-dom";
import "../styles/NavBar.css";

//* COMPONENTE

export default function NavBar() {
  return (
    <nav className="fix">
      <div className="list">
        <div className="items">
          <Link to="/home">Menu</Link>
        </div>

        <div className="items">
          <Link to="/recipe">Crear Receta</Link>
        </div>

        <div className="items">
          <Link to="/about">About</Link>
        </div>
      </div>
    </nav>
  );
}
