import { combineReducers } from "redux";

import genreReducer from "./../store/genre/index";
import userReducer from "./../store/user/index";
import ratingReducer from "./../store/rating/index";
import trackReducer from "./../store/track/index";

const rootReducer = combineReducers({
  genreReducer,
  userReducer,
  ratingReducer,
  trackReducer,
});

export default rootReducer;
