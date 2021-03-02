import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import trackReducers from "./track.reducers";

export type TrackState = {
  tracks: Track.Track[];
};

export const trackInitialState: TrackState = {
  tracks: [],
};

export const trackSlice: Slice<TrackState> = createSlice({
  name: "track",
  initialState: trackInitialState,
  reducers: { ...trackReducers },
});

export default trackSlice.reducer;
