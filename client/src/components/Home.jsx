import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRecipes } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  // reinicio de recetas
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]); // dependencia

  //? Recargar pág
  function handleClick(e) {
    e.preventDefault();
    dispatch(getAllRecipes());
  }

  return (
    <div>
      <Link to="/recipe">
        <button> Crear nueva receta </button>
      </Link>
      <h1> Menu de Recetas </h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar Recetas
      </button>

      {/* Filtros */}

      <div>
        <label> Orden Alfabético </label>
        <select>
          <option value="Asc"> A-Z </option>
          <option value="Desc"> Z-A </option>
        </select>

        <label> Orden Saluble </label>
        <select>
          <option value="All"> Por Defecto </option>
          <option value="Asc"> Ascendente </option>
          <option value="Desc"> Descendente </option>
        </select>

        <label> Tipo de Dieta </label>
        <select>
          <option value="Default"> Todas </option>
          <option value="Gluten Free"> Gluten Free </option>
          <option value="Dairy Free"> Dairy Free </option>
          <option value="Ketogenic"> Ketogenic </option>
          <option value="Vegan"> Vegan </option>
          <option value="Lacto Ovo Vegetarian"> Lacto Ovo Vegetarian </option>
          <option value="Fodmap Friendly"> Fodmap Friendly </option>
          <option value="Pescatarian"> Pescatarian </option>
          <option value="Paleolithic"> Paleolithic </option>
          <option value="Primal"> Primal </option>
          <option value="Whole 30"> Whole 30 </option>
        </select>

        <label> Fuente de Datos </label>
        <select>
          <option value="All"> Todos </option>
          <option value="Created"> Recetas Creadas </option>
          <option value="Api"> Recetas de Api </option>
        </select>
      </div>

      {/* Card */}

      <div>
        {allRecipes?.map((e) => {
          return (
            <Link to={`/recipes/${e.id}`}>
              <Card name={e.name} diet={e.diet} image={e.image} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
