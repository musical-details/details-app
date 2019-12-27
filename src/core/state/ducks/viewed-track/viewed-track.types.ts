enum ActionTypes {
  SET_TRACK_ID = "viewed-track/SET_TRACK_ID",
  FETCH_META_PENDING = "viewed-track/FETCH_META_PENDING",
  FETCH_META_SUCCESS = "viewed-track/FETCH_META_SUCCESS",
  FETCH_META_ERROR = "viewed-track/FETCH_META_ERROR",
  FETCH_WAVE_PENDING = "viewed-track/FETCH_WAVE_PENDING",
  FETCH_WAVE_SUCCEESS = "viewed-track/FETCH_WAVE_SUCCESS",
  FETCH_WAVE_ERROR = "viewed-track/FETCH_WAVE_ERROR",
  SET_AUDIO_SOURCE = "viewed-track/SET_AUDIO_SOURCE",
  SET_AUDIO_DURATION = "viewed-track/SET_AUDIO_DURATION",
  SET_AUDIO_STATUS = "viewed-track/SET_AUDIO_STATUS",
  TOOGLE_AUDIO_STATUS = "viewed-track/TOOGLE_AUDIO_STATUS",
  SET_AUDIO_CURRENT_TIME = "viewed-track/SET_AUDIO_CURRENT_TIME",
  SET_IN_PLAYER = "viewed-track/SET_IN_PLAYER",
  UNSET_IN_PLAYER = "viewed-track/UNSET_IN_PLAYER"
}

export default ActionTypes;
