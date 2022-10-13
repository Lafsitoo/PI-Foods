import axios from "axios";

const url = "https://localhost:3001";

// para obtener todos los recipes
export function getRecipes() {
  return async function (dispatch) {
    // conexion entre el back y el front
    const json = await axios(`${url}/recipes`);
    return dispatch({
      type: "GET_RECIPES",
      payload: json.data,
    });
  };
}
