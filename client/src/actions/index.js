import axios from "axios";

const url = "https://localhost:3001";

// para obtener todos los recipes
export function getAllRecipes() {
  return async function (dispatch) {
    // conexion entre el back y el front
    try {
      const response = await axios.get(`${url}/recipes`, {});
      dispatch({
        type: "GET_RECIPES",
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: "ERROR",
        payload: {
          name: error.name,
          message: error.message,
        },
      });
    }
  };
}
