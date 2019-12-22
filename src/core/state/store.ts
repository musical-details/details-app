import {
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  Store
} from "redux";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./ducks";

type State = any;

export default function configureStore(initialState: State): Store {
  const rootReducer: Reducer = combineReducers(reducers);
  // const middlewares = applyMiddleware(y);

  return createStore(rootReducer, initialState);
}
