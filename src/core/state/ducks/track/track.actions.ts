import ActionTypes from "./track.types";
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

const setAudioSource = (audioSource: string): Action => ({
  type: ActionTypes.SET_AUDIO_SOURCE,
  payload: {
    audioSource: audioSource
  }
});

const fetchWavePending = (trackId: number): Action => ({
  type: "",
  payload: {
    trackId: trackId
  }
});

const fetchWaveSuccess = (wave: Array<number>): Action => ({
  type: "",
  payload: {
    wave: wave
  }
});

const fetchWaveError = (error: any): Action => ({
  type: "",
  error: error
});

const setAudioDuration = (duration: number): Action => ({
  type: ActionTypes.SET_AUDIO_DURATION,
  payload: {
    duration: duration
  }
});

const setAudioStatus = (status: boolean): Action => ({
  type: ActionTypes.SET_AUDIO_STATUS,
  payload: {
    status: status
  }
});

const toogleAudioStatus = (): Action => ({
  type: ActionTypes.TOOGLE_AUDIO_STATUS
});

const setAudioCurrentTime = (currentTime: number): Action => ({
  type: ActionTypes.SET_AUDIO_CURRENT_TIME,
  payload: {
    currentTime: currentTime
  }
});

const transferMetaSuccess = (data: {
  title: string;
  cover: string;
  author: string;
}): Action => ({
  type: ActionTypes.TRANSFER_META_SUCCESS,
  payload: {
    title: data.title,
    cover: data.cover,
    author: data.author
  }
});

export default {
  setTrackId,
  fetchMetaPending,
  fetchMetaSuccess,
  fetchMetaError,
  setAudioSource,
  setAudioDuration,
  setAudioStatus,
  toogleAudioStatus,
  setAudioCurrentTime,
  transferMetaSuccess
};
