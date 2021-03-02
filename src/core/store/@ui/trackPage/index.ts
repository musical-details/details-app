import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import trackPageReducers from "./trackPage.reducers";

export type TrackPageState = {
  userId: string | undefined;
};

export const trackPageInitialState: TrackPageState = {
  userId: undefined,
};

export const trackPageSlice: Slice<TrackPageState> = createSlice({
  name: "trackPage",
  initialState: trackPageInitialState,
  reducers: { ...trackPageReducers },
});

export default trackPageSlice.reducer;
