import { AppUserState, initialState } from "./user.state";
import ActionTypes from "./user.types";

const userReducer = (
  state: AppUserState = initialState,
  action: any
): AppUserState => {
  switch (action.type) {
    default:
      return state;
  }
};

export default userReducer;
