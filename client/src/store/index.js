import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunks from "redux-thunk";
import rootReduce from "../reducer";

export const store = createStore(
  rootReduce,
  composeWithDevTools(applyMiddleware(thunks))
);
