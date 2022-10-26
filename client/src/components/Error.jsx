import React from "react";
import NavBar from "./NavBar";
import "../styles/Error.css";

//* COMPONENTE

export default function Error() {
  return (
    <div className="error">
      <NavBar />
      <img src="https://symbanservices.com/wp-content/uploads/2017/10/404-error-donut.png" alt="" />
    </div>
  );
}
