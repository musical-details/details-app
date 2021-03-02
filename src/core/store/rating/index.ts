import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import ratingReducers from "./rating.reducers";
import momentsReducers from "./moments/moments.reducers";

export type RatingState = {
  ratings: Rating.Rating[];
};

export const ratingInitialState: RatingState = {
  ratings: [],
};

export const ratingSlice: Slice<RatingState> = createSlice({
  name: "rating",
  initialState: ratingInitialState,
  reducers: { ...ratingReducers, ...momentsReducers },
});

export default ratingSlice.reducer;
