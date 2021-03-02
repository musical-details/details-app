import { combineReducers } from "redux";

import genre from "./../store/genre/index";
import user from "./../store/user/index";
import rating from "./../store/rating/index";
import track from "./../store/track/index";

const rootReducer = combineReducers({
  genre,
  user,
  rating,
  track,
});

export default rootReducer;
