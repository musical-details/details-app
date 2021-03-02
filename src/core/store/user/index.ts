import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import userReducers from "./user.reducers";
import connectionsReducers from "./connections/connections.reducers";
import favouriteTracksReducers from "./favouriteTracksIds/favouriteTrackIds.reducers";

export type UserState = {
  users: User.User[];
};

export const userInitialState: UserState = {
  users: [],
};

export const userSlice: Slice<UserState> = createSlice({
  name: "user",
  initialState: userInitialState,
  reducers: {
    ...userReducers,
    ...connectionsReducers,
    ...favouriteTracksReducers,
  },
});

export default userSlice.reducer;
