import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../utils";
import { TrackState } from "./index";
import {
  CreateTrackActionPayload,
  DeleteTrackActionPayload,
  SetTracksActionPayload,
  UpdateTrackActionPayload,
} from "./track.actions";

export const setTracks = (
  state: TrackState,
  { payload }: PayloadAction<SetTracksActionPayload>
) => {
  const { tracks } = payload;
  state.tracks = tracks;
  return state;
};

export const createTrack = (
  state: TrackState,
  { payload }: PayloadAction<CreateTrackActionPayload>
) => {
  const { newTrack } = payload;
  state.tracks = [...state.tracks, newTrack];
  return state;
};

export const updateTrack = (
  state: TrackState,
  { payload }: PayloadAction<UpdateTrackActionPayload>
) => {
  const { trackId, nextTrack } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx] = { ...state.tracks[trackIdx], ...nextTrack };
  return state;
};

export const deleteTrack = (
  state: TrackState,
  { payload }: PayloadAction<DeleteTrackActionPayload>
) => {
  const { trackId } = payload;
  state.tracks = state.tracks.filter((track) => track._id !== trackId);
  return state;
};

export default {
  setTracks,
  createTrack,
  updateTrack,
  deleteTrack,
};
