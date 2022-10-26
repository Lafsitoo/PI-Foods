import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions
import { postRecipe, getAllDiets } from "../redux/actions";
import "../styles/CreateRecipe.css";
import NavBar from "./NavBar";

//* COMPONENTE

export default function CreateRecipe() {
  const dispath = useDispatch();
  const history = useHistory(); // nos redirigira a la ruta que le digamos

  //* ESTADOS

  const diet = useSelector((state) => state.diets);

  // propiedades de para la nueva receta
  const [newRecipe, setNewRecipe] = useState({
    name: "",
    img: "",
    summary: "",
    healthScore: 0,
    steps: [],
    diets: [],
  });

  // parte manejo de errores
  const [errorValidation, setErrorValidation] = useState({});

  // reinicio
  useEffect(() => {
    dispath(getAllDiets());
  }, [dispath]);

  //* MANEJO DE ERRORES
  // match es para buscar obtener ocurencias dentro del array ej:(\d+(\.\d)*)
  function validate(newRecipe) {
    let error = {};

    // name
    if (
      newRecipe.name.length >= 0 &&
      !newRecipe.name.match(/^[a-zA-Z_]+( [a-zA-Z_]+)*$/)
    ) {
      error.name = "Se requiere un nombre valido";
    } else error.name = null;
    // image
    if (
      newRecipe.img.length > 1 &&
      !newRecipe.img.match(/^(ftp|http|https):\/\/[^ "]+$/)
    ) {
      error.img = "Debe haber una URL";
    }
    // resumen
    if (newRecipe.summary.length === 0) {
      error.summary = "Se requiere resumen de la receta";
    } else error.summary = null;
    // healthScore
    if (!newRecipe.healthScore > 0 && !newRecipe.healthScore < 100) {
      error.healthScore = "Debe ser entre 0 y 100";
    } else error.healthScore = null;
    // diet
    if (newRecipe.diets && newRecipe.diets.length === 0) {
      error.diets = "Debe seleccionar al menos una dieta";
    } else error.diets = null;
    // steps
    if (newRecipe.steps.length === 0) {
      error.steps = "Se requieren pasos de elaboración";
    } else error.steps = null;

    return error;
  }

  //* LOGICAS

  //? manejo de cambio de valores ( escribir en los inputs )
  function handleChange(e) {
    setNewRecipe({
      ...newRecipe,
      [e.target.name]: e.target.value,
    });

    setErrorValidation(
      validate({
        ...newRecipe,
        [e.target.name]: e.target.value,
      })
    );
  }

  //? agregar diets
  function handleSelect(e) {
    setNewRecipe({
      ...newRecipe,
      diets: [...newRecipe.diets, e.target.value],
    });
    setErrorValidation(
      validate({
        ...newRecipe,
        diets: [...newRecipe.diets, e.target.value],
      })
    );
  }

  //? eliminar diets
  function deleteSelect(e) {
    setNewRecipe({
      ...newRecipe,
      diets: newRecipe.diets.filter((el) => el !== e),
    });
  }

  //? verificar y finalizar la creación
  function hendleSubmit(e) {
    e.preventDefault();
    dispath(postRecipe(newRecipe));
    alert(`¡La receta ${newRecipe.name} fue creada con exito!`);
    setNewRecipe({
      name: "",
      img: "",
      summary: "",
      healthScore: 0,
      steps: [],
      diets: [],
    });
    history.push("/home");
  }

  //* RENDER

  return (
    <div>
      <NavBar />

      <div className="background">
        <form className="form">
          <div>
            <h1> Creando Receta </h1>
          </div>
          <div>
            {/* NOMBRE */}

            <div>
              <label>
                <span>
                  Nombre: <span className="required">* </span>
                </span>
              </label>
              <input
                type="text"
                value={newRecipe.name}
                name="name"
                placeholder="Nombre de la receta"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errorValidation.name && (
                <h5 className="error">{errorValidation.name}</h5>
              )}
            </div>

            {/* IMAGEN */}

            <div>
              <label>
                <span>Imagen ilustrativa: </span>
              </label>
              <input
                type="url"
                value={newRecipe.img}
                name="img"
                placeholder="URL de la imagen"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errorValidation.img && (
                <h5 className="error">{errorValidation.img}</h5>
              )}
            </div>

            {/* RESUMEN */}

            <div>
              <label>
                <span>
                  Resumen: <span className="required">* </span>
                </span>
              </label>
              <input
                type="text"
                name="summary"
                placeholder="Resumen de la receta"
                value={newRecipe.summary}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errorValidation.summary && (
                <h5 className="error">{errorValidation.summary}</h5>
              )}
            </div>

            {/* LVL SALUBRE */}

            <div>
              <label>
                <span>
                  Nivel Salubre: <span className="required">* </span>
                </span>
              </label>
              <input
                type="range"
                className="input-field"
                value={newRecipe.healthScore}
                name="healthScore"
                onChange={(e) => {
                  handleChange(e);
                }}
                min={1}
                max={100}
              />
              {newRecipe.healthScore}
              {errorValidation.healthScore && (
                <h5 className="error">{errorValidation.healthScore}</h5>
              )}
            </div>

            {/* DIETA */}
            {/* pregunto si hay dietas y las mapeo para luego asignarlas como posibles opciones */}
            <div>
              <label>
                <span>
                  Dieta/s: <span className="required">* </span>
                </span>
              </label>
              <select onChange={(e) => handleSelect(e)}>
                <option> Selecionar </option>
                {diet?.map((el) => {
                  return <option value={el.name}>{el.name}</option>;
                })}
              </select>
              {errorValidation.diets && (
                <h5 className="error">{errorValidation.diets}</h5>
              )}
            </div>
            {/* apartado para crear una lista de diets, para poder seleccionar más de una, y poder eliminarlas */}
            <div>
              <ul>
                {newRecipe.diets.map((el) => (
                  <li>
                    {el + " "}
                    <button onClick={() => deleteSelect(el)}> X </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* PASO A PASO */}

            <div>
              <label>
                <span>
                  Pasos de elaboración: <span className="required">* </span>
                </span>
              </label>
              <textarea
                type="text"
                value={newRecipe.steps}
                name="steps"
                placeholder="Pasos a seguir"
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              {errorValidation.steps && (
                <h5 className="error">{errorValidation.steps}</h5>
              )}
            </div>

            {/* SUBMIT */}

            <div>
              <button
                class="button-62"
                type="submit"
                disabled={
                  !(
                    errorValidation.name === null &&
                    errorValidation.summary === null &&
                    errorValidation.healthScore === null &&
                    errorValidation.diets === null &&
                    errorValidation.steps === null
                  )
                }
                onClick={(e) => hendleSubmit(e)}
              >
                Crear Receta
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
