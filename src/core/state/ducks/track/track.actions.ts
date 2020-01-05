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

const setAudioRecording = (status: boolean): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING,
  payload: {
    status: status
  }
});

const setAudioRecordingTimeStart = (timeStart: number): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING_TIME_START,
  payload: {
    recordedTimeStart: timeStart
  }
});

const setAudioRecordingTimeEnd = (timeEnd: number): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING_TIME_END,
  payload: {
    recordedTimeEnd: timeEnd
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

const setAudioNewTime = (newTime: number): Action => ({
  type: ActionTypes.SET_AUDIO_NEW_TIME,
  payload: {
    newTime: newTime
  }
});

const setAudioVolume = (volume: number): Action => ({
  type: ActionTypes.SET_AUDIO_VOLUME,
  payload: {
    volume: volume
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

const setAudioAutoplay = (autoplay: boolean) => ({
  type: ActionTypes.SET_AUDIO_AUTOPLAY,
  payload: {
    autoplay: autoplay
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
  setAudioRecording,
  setAudioRecordingTimeStart,
  setAudioRecordingTimeEnd,
  toogleAudioStatus,
  setAudioCurrentTime,
  setAudioNewTime,
  transferMetaSuccess,
  setAudioAutoplay,
  setAudioVolume
};
