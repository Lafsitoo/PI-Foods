import React from "react";
import { Link } from "react-router-dom";
// hooks de React
import { useEffect, useState } from "react";
// hooks de React - Redux
import { useDispatch, useSelector } from "react-redux";
// actions
import {
  getAllRecipes,
  filterByDiets,
  filterBySource,
  filterSortName,
  filterSortScore,
} from "../redux/actions";
// componenetes que voy a usar
import Card from "./Card";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import NavBar from "./NavBar";
import "../styles/Home.css";
import Title from "./Title";

//* COMIENZO DEL COMPONENTE NUCLEO

export default function Home() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recipes);

  //* ESTADOS

  // paginado
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

  //? Filtro orden a-z / z-a
  function handleOrderName(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterSortName(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  //? Filtro orden salubre
  function handleOrderScore(e) {
    e.preventDefault();
    setCurrentPage(1);
    dispatch(filterSortScore(e.target.value));
    setOrder(`Order ${e.target.value}`);
  }

  return (
    <div className="home">
      {/* Barrra de Navagación */}

      <NavBar />

      {/* Titulo */}

      <Title />

      {/* Barra de Busqueda */}

      <SearchBar />

      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Recargar Recetas
      </button>

      {/* Filtros */}
      <div>
        <div className="filt">
          <select className="az" onChange={(e) => handleOrderName(e)}>
            <option value=""> Orden Alfabético </option>
            <option value="Asc"> A-Z </option>
            <option value="Desc"> Z-A </option>
          </select>

          <select onChange={(e) => handleOrderScore(e)}>
            <option value="All"> Orden Saluble </option>
            <option value="Up"> Ascendente </option>
            <option value="Down"> Descendente </option>
          </select>

          <select onChange={(e) => handleFilterDiet(e)}>
            <option value=""> Tipo de Dieta </option>
            <option value="Default"> Todas </option>
            <option value="gluten free"> Gluten Free </option>
            <option value="dairy free"> Dairy Free </option>
            <option value="ketogenic"> Ketogenic </option>
            <option value="vegan"> Vegan </option>
            <option value="lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
            <option value="fodmap friendly"> Fodmap Friendly </option>
            <option value="pescatarian"> Pescatarian </option>
            <option value="paleolithic"> Paleolithic </option>
            <option value="primal"> Primal </option>
            <option value="whole 30"> Whole 30 </option>
          </select>

          <select onChange={(e) => handleFilterSource(e)}>
            <option value=""> Fuente de Datos </option>
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

        <div className="gallery">
          {currentRecipe?.map((el) => {
            return (
              <Link to={`/recipes/${el.id}`}>
                <Card name={el.name} image={el.image} diet={el.diets} />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
