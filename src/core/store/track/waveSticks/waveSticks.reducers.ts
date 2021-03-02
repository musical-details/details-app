import { findIdxById } from "./../../../../utils/index";
import { PayloadAction } from "@reduxjs/toolkit";
import { TrackState } from "..";
import { SetTrackWaveSticksActionPayload } from "./waveSticks.actions";

export const setTrackWaveSticks = (
  state: TrackState,
  { payload }: PayloadAction<SetTrackWaveSticksActionPayload>
) => {
  const { trackId, waveSticks } = payload;
  const trackIdx: number = findIdxById(state.tracks, trackId);
  state.tracks[trackIdx].waveSticks = waveSticks;
  return state;
};

export default {
  setTrackWaveSticks,
};
