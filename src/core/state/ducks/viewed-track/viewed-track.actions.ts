import ActionTypes from "./viewed-track.types";
import { SoundCloud } from "../../../soundcloud";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const setTrackId = (trackId: number): Action => ({
  type: ActionTypes.SET_TRACK_ID,
  payload: {
    trackId: trackId
  }
});

const fetchMetaPending = (trackId: number): Action => ({
  type: ActionTypes.FETCH_META_PENDING,
  payload: {
    trackId: trackId
  }
});

const fetchMetaSuccess = (data: SoundCloud.TrackData): Action => ({
  type: ActionTypes.FETCH_META_SUCCESS,
  payload: {
    cover: data.artwork_url.toString().replace("large", "t500x500"),
    title: data.title,
    author: data.user.username
  }
});

const fetchMetaError = (error: any): Action => ({
  type: ActionTypes.FETCH_META_ERROR,
  error: error
});

const fetchWavePending = (): Action => ({
  type: ActionTypes.FETCH_WAVE_PENDING
});

const fetchWaveSuccess = (wave: Array<number>): Action => ({
  type: ActionTypes.FETCH_WAVE_SUCCEESS,
  payload: {
    wave: wave
  }
});

const fetchWaveError = (error: any): Action => ({
  type: ActionTypes.FETCH_WAVE_ERROR,
  error: error
});

const setInPlayer = (): Action => ({
  type: ActionTypes.SET_IN_PLAYER
});

const unsetInPlayer = (): Action => ({
  type: ActionTypes.UNSET_IN_PLAYER
});

export default {
  setTrackId,
  fetchMetaPending,
  fetchMetaSuccess,
  fetchMetaError,
  fetchWavePending,
  fetchWaveSuccess,
  fetchWaveError,
  setInPlayer,
  unsetInPlayer
};
