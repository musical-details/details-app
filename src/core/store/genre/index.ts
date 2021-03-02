import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import genreReducers from "./genre.reducers";

export type GenreState = {
  genres: Genre.Genre[];
};

export const genreInitialState: GenreState = {
  genres: [],
};

export const genreSlice: Slice<GenreState> = createSlice({
  name: "genre",
  initialState: genreInitialState,
  reducers: { ...genreReducers },
});

export default genreSlice.reducer;
