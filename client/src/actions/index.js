import axios from "axios";

export const GET_ALL_RECIPES = "GET_ALL_RECIPES";
// const url = "https://localhost:3001";

// para obtener todos los recipes
export function getAllRecipes() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/recipes");
    dispatch({
      type: GET_ALL_RECIPES,
      payload: json.data,
    });
  };
}
