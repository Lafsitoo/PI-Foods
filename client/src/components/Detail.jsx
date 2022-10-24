import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./LandingPage";
// actions
import { getDetails, getClean } from "../redux/actions";

//* COMPONENTE

export default function Detail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const recipeId = useSelector((state) => state.detail);

  const [charged, setCharged] = useState(true);

  useEffect(() => {
    dispatch(getDetails(id));
    return function () {
      dispatch(getClean());
    };
  }, [dispatch, id]);

  console.log(recipeId[0]);

  //* RENDER

  return (
    <div>
      <img
        src={recipeId.length ? recipeId[0].image : "Imagen no encontrada"}
        alt=""
      />
      <h2> Nombre: {recipeId.length ? recipeId[0].name : "Cargando..."} </h2>
      <h5> Dietas:
        {recipeId.length
          ? recipeId[0].diets.map((e) => <h5>{e.name}</h5>)
          : "Cargando..."}
      </h5>
      <h5> Resumen:
        {recipeId.length
          ? recipeId[0].summary.replace(/<[^>]*>/g, "")
          : "Cargando..."}
      </h5>
      <h5> Nivel Salubre: {recipeId.length ? recipeId[0].healthScore : "Cargando..."} </h5>
      <h5> Paso a paso:
        {recipeId.length
          ? recipeId[0].steps
            ? recipeId[0].steps[0].steps.map((e) => <h5>{e.step}</h5>)
            : recipeId[0].steps
          : "Cargando..."}
      </h5>

      <div>
        <Link to="/home">
          <button> Inicio </button>
        </Link>
      </div>

      {/* {!recipeId[0].name || recipeId[0].id !== id ? (
        <LoadingPage />
      ) : (
        <div>
          <div>
            <Link to="/home">
              <button> Inicio </button>
            </Link>
          </div>
          <h1> Detalles </h1>
          
          <img src={recipeId.length ? recipeId[0].image : "Imagen no encontrada"} alt=""/>
          <h2> {recipeId.length? recipeId[0].name : "Cargando..."} </h2>
          <h5> {recipeId.length? recipeId[0].diets : "Cargando..."} </h5>
          <h5> {recipeId.length? recipeId[0].summary : "Cargando..."} </h5>
          <h5> {recipeId.length? recipeId[0].healthScore : "Cargando..."} </h5>
          <h5> {recipeId.length? recipeId[0].steps[0].step?recipeId[0].steps.map(el => el.step) :recipeId[0].steps : "Cargando..."} </h5>
          <div>

          </div>
        </div>
      )} */}
    </div>
  );
}
