import { AppState } from "../models";

export const getGenres = (state: AppState): Genre.Genre[] => {
  return state.genre.genres;
};

export const getGenresCount = (state: AppState): number => {
  return state.genre.genres.length;
};
