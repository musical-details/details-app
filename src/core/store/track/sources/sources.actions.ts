import { trackSlice } from "../index";

export type SetTrackSourcesActionPayload = {
  trackId: string;
  sources: Track.Sources;
};

export const setTrackSourcesAction = (
  payload: SetTrackSourcesActionPayload
) => {
  return trackSlice.actions.setTrackSources(payload);
};

/** */

export type UpdateTrackSourcesActionPayload = {
  trackId: string;
  nextSources: Partial<Track.Sources>;
};

export const updateTrackSourcesAction = (
  payload: UpdateTrackSourcesActionPayload
) => {
  return trackSlice.actions.updateTrackSources(payload);
};
