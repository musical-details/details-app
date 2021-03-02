import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../../utils";
import { TrackState } from "../index";
import {
  CreateTrackGenreIdActionPayload,
  DeleteTrackGenreIdActionPayload,
  SetTrackGenreIdsActionPayload,
  UpdateTrackGenreIdActionPayload,
} from "./genreIds.actions";

export const setTrackGenreIds = (
  state: TrackState,
  { payload }: PayloadAction<SetTrackGenreIdsActionPayload>
) => {
  const { trackId, genreIds } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx] = {
    ...state.tracks[trackIdx],
    genreIds,
  };
  return state;
};

export const createTrackGenreId = (
  state: TrackState,
  { payload }: PayloadAction<CreateTrackGenreIdActionPayload>
) => {
  const { trackId, newGenreId } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx].genreIds = [
    ...state.tracks[trackIdx].genreIds,
    newGenreId,
  ];
  return state;
};

export const updateTrackGenreId = (
  state: TrackState,
  { payload }: PayloadAction<UpdateTrackGenreIdActionPayload>
) => {
  const { trackId, genreId, nextGenreId } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  const genreIdx: number = state.tracks[trackIdx].genreIds.findIndex(
    (id) => id === genreId
  );
  state.tracks[trackIdx].genreIds[genreIdx] = nextGenreId;
  return state;
};

export const deleteTrackGenreId = (
  state: TrackState,
  { payload }: PayloadAction<DeleteTrackGenreIdActionPayload>
) => {
  const { trackId, genreId } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx].genreIds = state.tracks[trackIdx].genreIds.filter(
    (id) => genreId !== id
  );
  return state;
};

export default {
  setTrackGenreIds,
  createTrackGenreId,
  updateTrackGenreId,
  deleteTrackGenreId,
};
