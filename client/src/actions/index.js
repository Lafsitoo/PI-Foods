import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const GET_DIETS = "GET_DIETS";

const url = "http://localhost:3001";

//? obtener todos los recipes
export function getAllRecipes() {
  return async function (dispatch) {
    var json = await axios.get(`${url}/recipes`);
    dispatch({
      type: GET_ALL_RECIPES,
      payload: json.data,
    });
  };
}

//? obtener todas las dietas
export function getAllDiets() {
  return async function (dispatch) {
    var json = await axios.get(`${url}/diets`);
    dispatch({
      type: GET_DIETS,
      payload: json.data,
    });
  };
}

//* FILTROS

//? filtro por tipo de plato
export function filterByDiets(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}
