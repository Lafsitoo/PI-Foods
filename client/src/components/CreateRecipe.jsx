import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// actions
import { postRecipe, getAllDiets } from "../redux/actions";

//* COMPONENETE

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
    // img
    if (typeof newRecipe.img !== "string") {
      error.img = "Debe haber una URL";
    } else error.img = null;
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
      <div>
        <Link to="/home">
          <button> Volver al Menu </button>
        </Link>
      </div>

      <div>
        <h1> Creando Receta </h1>
      </div>

      <form>
        <div>
          {/* NOMBRE */}

          <div>
            <label> Nombre: </label>
            <input
              type="text"
              value={newRecipe.name}
              name="name"
              placeholder="Nombre de la receta"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errorValidation.name && <p>{errorValidation.name}</p>}
          </div>

          {/* IMAGEN */}

          <div>
            <label> Imagen ilustrativa: </label>
            <input
              type="text"
              value={newRecipe.img}
              name="img"
              placeholder="URL de la imagen"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errorValidation.img && <p>{errorValidation.img}</p>}
          </div>

          {/* RESUMEN */}

          <div>
            <label> Resumen: </label>
            <input
              type="text"
              name="summary"
              placeholder="Resumen de la receta"
              value={newRecipe.summary}
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errorValidation.summary && <p>{errorValidation.summary}</p>}
          </div>

          {/* LVL SALUBRE */}

          <div>
            <label> Nivel Salubre: </label>
            <input
              type="number"
              value={newRecipe.healthScore}
              name="healthScore"
              onChange={(e) => {
                handleChange(e);
              }}
              min={1}
              max={100}
            />
            {errorValidation.healthScore && (
              <p>{errorValidation.healthScore}</p>
            )}
          </div>

          {/* DIETA */}
          {/* pregunto si hay dietas y las mapeo para luego asignarlas como posibles opciones */}
          <div>
            <label> Dieta/s: </label>
            <select onChange={(e) => handleSelect(e)}>
              <option> Selecionar </option>
              {diet?.map((el) => {
                return <option value={el.name}>{el.name}</option>;
              })}
            </select>
            {errorValidation.diets && <p>{errorValidation.diets}</p>}
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
            <label> Pasos de elaboración: </label>
            <textarea
              type="text"
              value={newRecipe.steps}
              name="steps"
              placeholder="Pasos a seguir"
              onChange={(e) => {
                handleChange(e);
              }}
            />
            {errorValidation.steps && <p>{errorValidation.steps}</p>}
          </div>

          {/* SUBMIT */}

          <div>
            <button
              type="submit"
              disabled={
                !(
                  errorValidation.name === null &&
                  errorValidation.img === null &&
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
  );
}
