import { GET_ALL_RECIPES, GET_DIETS, FILTER_BY_DIET } from "../actions";

const initialState = {
  recipes: [],
  allRecipes: [],
  diets: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };

    case GET_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case FILTER_BY_DIET:
      const allRec = state.allRecipes;
      const filterByDiet =
        action.payload === "Default"
          ? allRec
          : allRec.filter(el => el.diets?.some(d => d.name === action.payload))
      return {
        ...state,
        recipes: filterByDiet,
      };

    default:
      return state;
  }
}

export default rootReducer;
