import { findIdxById } from "./../../../../utils/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { TrackState } from "..";
import {
  SetTrackSourcesActionPayload,
  UpdateTrackSourcesActionPayload,
} from "./sources.actions";

export const setTrackSources = (
  state: TrackState,
  { payload }: PayloadAction<SetTrackSourcesActionPayload>
) => {
  const { trackId, sources } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx].sources = sources;
  return state;
};

export const updateTrackSources = (
  state: TrackState,
  { payload }: PayloadAction<UpdateTrackSourcesActionPayload>
) => {
  const { trackId, nextSources } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx].sources = {
    ...state.tracks[trackIdx].sources,
    ...nextSources,
  };
  return state;
};

export default {
  setTrackSources,
  updateTrackSources,
};
