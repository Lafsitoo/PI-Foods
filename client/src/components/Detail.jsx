import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import Loader from "./Loader";
// actions
import { getDetails, getClean } from "../redux/actions";

//* COMPONENTE

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = useSelector((state) => state.detail);

  const [charged, setCharged] = useState(true);

  useEffect(() => {
    // espera
    setTimeout(() => {
      setCharged(false);
    }, 2000);
    dispatch(getDetails(id));
    return function () {
      dispatch(getClean());
    };
  }, [dispatch, id]);

  console.log(recipeId[0]);

  //* RENDER

  return (
    <div>
      <NavBar />

      {charged ? (
        <Loader />
      ) : (
        <div>
          <img
            src={recipeId.length ? recipeId[0].image : "Imagen no encontrada"}
            alt=""
          />
          <h2>
            Nombre: {recipeId.length ? recipeId[0].name : "Cargando..."}
          </h2>
          <h5>
            Dietas:
            {recipeId.length
              ? recipeId[0].diets.map((e) => <h5>{e.name}</h5>)
              : "Cargando..."}
          </h5>
          <h5>
            Resumen:
            {recipeId.length
              ? recipeId[0].summary.replace(/<[^>]*>/g, "")
              : "Cargando..."}
          </h5>
          <h5>
            Nivel Salubre:
            {recipeId.length ? recipeId[0].healthScore : "Cargando..."}
          </h5>
          <h5>
            Paso a paso:
            {recipeId.length? recipeId[0].steps[0].step?recipeId[0].steps.map(e=>e.step):recipeId[0].steps:"Cargando"}
            {/* {recipeId.length
              ? recipeId[0].steps
                ? recipeId[0].steps[0].steps.map((e) => e.step)
                : recipeId[0].steps
              : "Cargando..."} */}
          </h5>

          <div>
            <Link to="/home">
              <button> Inicio </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
