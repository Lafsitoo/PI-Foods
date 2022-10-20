import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRecipes,
  filterByDiets,
  filterBySource,
  filterSortName,
} from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Pagination";

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  //? paginado
  const [currentPage, setCurrentPage] = useState(1); // estado local, pág principal y seteado
  const [recipesPerPage] = useState(9); // cuantos platos quiero por pág ( setRecipesPerPage fue borrado por ser inutilizado )

  // personajes por pag en indices 0...9
  const indexOfLastCharacter = currentPage * recipesPerPage; // 9
  const indexOfFirstCharacter = indexOfLastCharacter - recipesPerPage; // 0

  // all recipes de la pág cargada. Cortara entre 0 - 9 el arreglo de recetas
  const currentRecipe = allRecipes.slice(
    indexOfFirstCharacter,
    indexOfLastCharacter
  );

  // ordenamiento de a-z / z-a. El primer valor no es utilizado, sin embargo, necesitamos que el segundo argumento exista
  const [order, setOrder] = useState("");

  // paginado render x num págs
  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // reinicio de recetas
  useEffect(() => {
    dispatch(getAllRecipes());
  }, [dispatch]); // dependencia

  //* LOGICAS

  //? Recargar pág
  function handleClick(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(getAllRecipes());
  }

  //? Filtro dietas dispatch
  function handleFilterDiet(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterByDiets(e.target.value));
  }

  //? Filtro fuente de datos
  function handleFilterSource(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterBySource(e.target.value));
  }

  //? Filtro a-z / z-a
  function handleOrderName(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterSortName(e.target.value));
    setOrder(`Order ${e.target.value}`);
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
        <select onChange={(e) => handleOrderName(e)}>
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
        <select onChange={(e) => handleFilterDiet(e)}>
          <option value="Default"> Todas </option>
          <option value="gluten free"> Gluten Free </option>
          <option value="dairy free"> Dairy Free </option>
          <option value="ketogenic"> Ketogenic </option>
          <option value="vegan"> Vegan </option>
          <option value="lacto ovo vegetarian"> Lacto Ovo Vegetarian </option>
          <option value="fodmap friendly"> Fodmap Friendly </option>
          <option value="pescatarian"> Pescatarian </option>
          <option value="paleolithic"> Paleolithic </option>
          <option value="primal"> Primal </option>
          <option value="whole 30"> Whole 30 </option>
        </select>

        <label> Fuente de Datos </label>
        <select onChange={(e) => handleFilterSource(e)}>
          <option value="All"> Todos </option>
          <option value="Created"> Recetas Creadas </option>
          <option value="Api"> Recetas de Api </option>
        </select>
      </div>

      {/* Patination */}

      <Pagination
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        pagination={pagination}
        currentPage={currentPage}
      />

      {/* Card */}

      <div>
        {currentRecipe?.map((el) => {
          return (
            <Link to={`/recipes/${el.id}`}>
              <Card name={el.name} image={el.image} diet={el.diets} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
