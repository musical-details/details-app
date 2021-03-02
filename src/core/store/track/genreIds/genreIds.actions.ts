import { trackSlice } from "../index";

export type SetTrackGenreIdsActionPayload = {
  trackId: string;
  genreIds: string[];
};

export const setTrackGenreIdsAction = (
  payload: SetTrackGenreIdsActionPayload
) => {
  return trackSlice.actions.setTrackGenreIds(payload);
};

/** */

export type CreateTrackGenreIdActionPayload = {
  trackId: string;
  newGenreId: string;
};

export const createFavouriteTrackIdAction = (
  payload: CreateTrackGenreIdActionPayload
) => {
  return trackSlice.actions.createFavouriteTrackId(payload);
};

/** */

export type UpdateTrackGenreIdActionPayload = {
  trackId: string;
  genreId: string;
  nextGenreId: string;
};

export const updateTrackGenreIdAction = (
  payload: UpdateTrackGenreIdActionPayload
) => {
  return trackSlice.actions.updateTrackGenreId(payload);
};

/** */

export type DeleteTrackGenreIdActionPayload = {
  trackId: string;
  genreId: string;
};

export const deleteTrackGenreIdAction = (
  payload: DeleteTrackGenreIdActionPayload
) => {
  return trackSlice.actions.deleteTrackGenreId(payload);
};
