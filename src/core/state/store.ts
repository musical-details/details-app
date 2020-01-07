import { AppUserState } from "./ducks/user/user.state";
import { AppViewedTrackState } from "./ducks/viewed-track/viewed-track.state";
import {
  createStore,
  applyMiddleware,
  combineReducers,
  Reducer,
  Store
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk";

import * as reducers from "./ducks";
import { AppTrackState } from "./ducks/track/track.state";
import ActionTypes from "./ducks/track/track.types";

export type AppState = {
  track: AppTrackState;
  viewedTrack: AppViewedTrackState;
  user: AppUserState;
};

const persistDataMiddleware = (store: any) => (next: any) => (action: any) => {
  if (action.type === ActionTypes.SET_AUDIO_CURRENT_TIME) return next(action);
  next(action);
  localStorage["appState"] = JSON.stringify(store.getState());
  console.log(JSON.parse(localStorage["appState"]));
  console.log(action.type);
};

const getPersistedState = (): AppState | undefined => {
  try {
    const persistedState = localStorage.getItem("appState");
    if (persistedState === null) throw new Error();
    console.log("###");
    console.log(JSON.parse(persistedState));
    console.log("###");
    return JSON.parse(persistedState);
  } catch (error) {
    return undefined;
  }
};

export default function getStore(): Store {
  const rootReducer: Reducer = combineReducers(reducers);
  const middlewares = applyMiddleware(thunkMiddleware, persistDataMiddleware);
  const composeEnhancers = composeWithDevTools({});

  return createStore(
    rootReducer,
    getPersistedState(),
    composeEnhancers(middlewares)
  );
}
