import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./NavBar";
import Loader from "./Loader";
import "../styles/Detail.css";
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
        <div className="ba">
          <div className="detail">
            <div>
              <img
                src={
                  recipeId.length ? recipeId[0].image : "Imagen no encontrada"
                }
                alt=""
              />
            </div>

            <div>
              <div>
                <h1>{recipeId.length ? recipeId[0].name : "Cargando..."}</h1>

                <h2>
                  {recipeId.length
                    ? recipeId[0].diets.map((e) => <h5>{e.name}</h5>)
                    : "Cargando..."}
                </h2>

                <p>
                  {recipeId.length
                    ? recipeId[0].summary.replace(/<[^>]*>/g, "")
                    : "Cargando..."}
                </p>

                <div>
                  <h3>
                    Nivel Salubre:
                    {recipeId.length ? recipeId[0].healthScore : "Cargando..."}
                  </h3>
                </div>
                <h3>Paso a paso:</h3>
                <p>
                  {/* {recipeId[0].length
              ? recipeId[0].steps[0].steps
                ? recipeId[0].steps[0].steps.map((e) => e.step)
                : recipeId.steps
              : "Cargando..."} */}
                  {/* {recipeId[0].length
              ? recipeId[0].steps[0].steps
                ? recipeId[0].steps[0].steps.map((e) => e.step)
                : recipeId[0].steps
              : "Cargando..."} */}
                  {recipeId.length
                    ? recipeId[0].steps[0].step
                      ? recipeId[0].steps.map((e) => e.step)
                      : recipeId[0].steps
                    : "Cargando"}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
