import { trackSlice } from "./index";

export type SetTracksActionPayload = {
  tracks: Track.Track[];
};

export const setTracksAction = (payload: SetTracksActionPayload) => {
  return trackSlice.actions.setTracks(payload);
};

/** */

export type CreateTrackActionPayload = {
  newTrack: Track.Track;
};

export const createTrackAction = (payload: CreateTrackActionPayload) => {
  return trackSlice.actions.createTrack(payload);
};

/** */

export type UpdateTrackActionPayload = {
  trackId: string;
  nextTrack: Partial<Track.Track>;
};

export const updateTrackAction = (payload: UpdateTrackActionPayload) => {
  return trackSlice.actions.updateTrack(payload);
};

/** */

export type DeleteTrackActionPayload = {
  trackId: string;
};

export const deleteTrackAction = (payload: DeleteTrackActionPayload) => {
  return trackSlice.actions.deleteTracks(payload);
};
