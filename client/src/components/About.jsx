import React from "react";
import NavBar from "./NavBar";
import "../styles/About.css";
// recursos
import linkedin from "../resources/linkedin.svg";
import github from "../resources/github.svg";
import madeHunry from "../resources/madeHunry.png";

//* COMPONENTE

export default function About() {
  return (
    <div>
      <NavBar />

      <div className="back">
        <section>
          <div className="image">
            <img src={madeHunry} alt="icons" />
          </div>

          {/* Sobre esto */}

          <div className="content">
            <p>
              <img
                src="https://img.icons8.com/officel/80/000000/pizza.png"
                alt=""
              />
            </p>
            <h2> About </h2>
            <p>
              Mi nombre es Leandro Ariel Frette y esté es mi Proyecto Individual
              de Henry.
            </p>
            <p> Para está página utilicé las siguientes tecnologias: </p>
            <ul>
              <li>HTML / CSS</li>
              <li>Javascript</li>
              <li>React & Redux (Front-End)</li>
              <li>Node Express (Back-End)</li>
              <li>Sequeliz (Database)</li>
            </ul>

            {/* Enlaces Personales */}

            <a href="https://www.linkedin.com/in/leandro-frette-7b6153243/">
              <img src={linkedin} alt="linkedin" />
            </a>

            <a href="https://github.com/Lafsitoo">
              <img src={github} alt="github" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
