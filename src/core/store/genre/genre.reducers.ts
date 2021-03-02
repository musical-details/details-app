import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../utils";
import { GenreState } from "./index";
import {
  CreateGenreActionPayload,
  DeleteGenreActionPayload,
  SetGenresActionPayload,
  UpdateGenreActionPayload,
} from "./genre.actions";

export const setGenres = (
  state: GenreState,
  { payload }: PayloadAction<SetGenresActionPayload>
) => {
  const { genres } = payload;
  state.genres = genres;
  return state;
};

export const createGenre = (
  state: GenreState,
  { payload }: PayloadAction<CreateGenreActionPayload>
) => {
  const { newGenre } = payload;
  state.genres = [...state.genres, newGenre];
  return state;
};

export const updateGenre = (
  state: GenreState,
  { payload }: PayloadAction<UpdateGenreActionPayload>
) => {
  const { genreId, nextGenre } = payload;
  const genreIdx: number = findIdxById(state.genres, genreId);
  state.genres[genreIdx] = { ...state.genres[genreIdx], ...nextGenre };
  return state;
};

export const deleteGenre = (
  state: GenreState,
  { payload }: PayloadAction<DeleteGenreActionPayload>
) => {
  const { genreId } = payload;
  state.genres = state.genres.filter((genre) => genre._id !== genreId);
  return state;
};

export default {
  setGenres,
  createGenre,
  updateGenre,
  deleteGenre,
};
