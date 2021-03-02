import { trackSlice } from "../index";

export type SetTrackWaveSticksActionPayload = {
  trackId: string;
  waveSticks: number[];
};

export const setTrackWaveSticksAction = (
  payload: SetTrackWaveSticksActionPayload
) => {
  return trackSlice.actions.setTrackWaveSticks(payload);
};

/** */
