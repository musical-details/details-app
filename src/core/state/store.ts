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

export type AppState = {
  track: AppTrackState;
  viewedTrack: AppViewedTrackState;
  user: AppUserState;
};

export default function getStore(): Store {
  const rootReducer: Reducer = combineReducers(reducers);
  const middlewares = applyMiddleware(thunkMiddleware);
  const composeEnhancers = composeWithDevTools({});

  return createStore(rootReducer, undefined, composeEnhancers(middlewares));
}
