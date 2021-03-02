import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import profilePageReducers from "./profilePage.reducers";

export type ProfilePageState = {
  userId: string | undefined;
};

export const profilePageInitialState: ProfilePageState = {
  userId: undefined,
};

export const profilePageSlice: Slice<ProfilePageState> = createSlice({
  name: "profilePage",
  initialState: profilePageInitialState,
  reducers: { ...profilePageReducers },
});

export default profilePageSlice.reducer;
