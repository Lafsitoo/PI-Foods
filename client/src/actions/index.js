import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
export const GET_RECIPES_BY_NAME = "GET_RECIPES_BY_NAME";
export const GET_DIETS = "GET_DIETS";
export const FILTER_BY_DIET = "FILTER_BY_DIET";
export const FILTER_BY_SOURCE = "FILTER_BY_SOURCE";
export const ORDER_SORT_SCORE ='ORDER_SORT_SCORE';
export const ORDER_SORT_NAME = "ORDER_SORT_NAME";

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

//? obtener mediante name ( Search )
export function getRecipesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`${url}/recipes?name=${name}`);
      return dispatch({
        type: GET_RECIPES_BY_NAME,
        payload: json.data,
      });

    } catch (error) {
      console.log(error);
      console.log("Hubo un error")
    }
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
// los payload son la info de cual opcion se selecciono

//? por tipo de plato
export function filterByDiets(payload) {
  return {
    type: FILTER_BY_DIET,
    payload,
  };
}

//? por tipo de dato ( api o db )
export function filterBySource(payload) {
  return {
    type: FILTER_BY_SOURCE,
    payload,
  };
}

//? por orden salubre
export function filterSortScore(payload){
  return {
    type: ORDER_SORT_SCORE,
    payload,
  }
}

//? por a-z / z-a
export function filterSortName(payload) {
  return {
    type: ORDER_SORT_NAME,
    payload,
  };
}
