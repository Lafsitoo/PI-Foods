const initialState = {
  recipes: [],
};

export default function rootReduce(state = initialState, action) {
  switch (action.type) {
    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };
  }
}
