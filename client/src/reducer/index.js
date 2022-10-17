const initialState = {
  recipes: [],
  allRecipes: [],
};

export default function rootReduce(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
      };
    default:
      return state;
  }
}
