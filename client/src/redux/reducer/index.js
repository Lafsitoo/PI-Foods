import {
  GET_ALL_RECIPES,
  GET_DIETS,
  GET_RECIPES_BY_NAME,
  FILTER_BY_DIET,
  FILTER_BY_SOURCE,
  ORDER_SORT_NAME,
  ORDER_SORT_SCORE,
} from "../actions";

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

    case GET_RECIPES_BY_NAME:
      return {
        ...state,
        recipes: action.payload,
      };

    case FILTER_BY_DIET:
      const allRec = state.allRecipes;
      const filterByDiet =
        action.payload === "Default"
          ? allRec
          : allRec.filter((el) =>
              el.diets?.some((d) => d.name === action.payload)
            );
      return {
        ...state,
        recipes: filterByDiet,
      };

    case FILTER_BY_SOURCE:
      const allRecSource = state.allRecipes;
      const filterBySource =
        action.payload === "Created"
          ? allRecSource.filter((el) => el.createdInDb)
          : allRecSource.filter((el) => !el.createdInDb);
      return {
        ...state,
        recipes: action.payload === "All" ? allRecSource : filterBySource,
      };

    // nuestro .sort ordenara de acuerdo a la logica dada. a.name sera el primer resultado de recipes que encuentre y lo comparará con b.name el cual es el segundo resultado encontrado, si son igual devolvera como ya estaba definido
    case ORDER_SORT_NAME:
      const recipesName = state.allRecipes;
      const sortNames =
        action.payload === "Asc"
          ? recipesName.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : recipesName.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "Desc" ? state.recipes : sortNames,
      };

    case ORDER_SORT_SCORE:
      const recipesScore = state.allRecipes;
      const sortScore =
        action.payload === "Up"
          ? recipesScore.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : recipesScore.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        recipes: action.payload === "All" ? state.recipes : sortScore,
      };

    default:
      return state;
  }
}

export default rootReducer;
