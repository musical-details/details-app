import { genreSlice } from "./index";

export type SetGenresActionPayload = {
  genres: Genre.Genre[];
};

export const setGenresAction = (payload: SetGenresActionPayload) => {
  return genreSlice.actions.setGenres(payload);
};

/** */

export type CreateGenreActionPayload = {
  newGenre: Genre.Genre;
};

export const createGenreAction = (payload: CreateGenreActionPayload) => {
  return genreSlice.actions.createGenre(payload);
};

/** */

export type UpdateGenreActionPayload = {
  genreId: string;
  nextGenre: Partial<Genre.Genre>;
};

export const updateGenreAction = (payload: UpdateGenreActionPayload) => {
  return genreSlice.actions.updateGenre(payload);
};

/** */

export type DeleteGenreActionPayload = {
  genreId: string;
};

export const deleteGenreAction = (payload: DeleteGenreActionPayload) => {
  return genreSlice.actions.deleteGenres(payload);
};
