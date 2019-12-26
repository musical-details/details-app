import { AppTrackState, initialState } from "./track.state";
import ActionTypes from "./track.types";

const trackReducer = (
  state: AppTrackState = initialState,
  action: any
): AppTrackState => {
  switch (action.type) {
    case ActionTypes.SET_TRACK_ID:
      return {
        ...state,
        trackId: action.payload.trackId
      };
    case ActionTypes.FETCH_META_PENDING:
      return {
        ...state
      };
    case ActionTypes.FETCH_META_SUCCESS:
      return {
        ...state,
        cover: action.payload.cover,
        title: action.payload.title,
        author: action.payload.author
      };
    case ActionTypes.FETCH_META_ERROR:
      return {
        ...state
      };
    case ActionTypes.SET_AUDIO_SOURCE:
      return {
        ...state,
        audioSource: action.payload.audioSource,
        isPlaying: false,
        currentTime: 0,
        volume: 1,
        duration: 0
      };
    case ActionTypes.SET_AUDIO_DURATION:
      return {
        ...state,
        duration: action.payload.duration
      };
    case ActionTypes.SET_AUDIO_STATUS:
      return {
        ...state,
        isPlaying: action.payload.status
      };
    case ActionTypes.TOOGLE_AUDIO_STATUS:
      return {
        ...state,
        isPlaying: !state.isPlaying
      };
    case ActionTypes.SET_AUDIO_CURRENT_TIME:
      return {
        ...state,
        currentTime: action.payload.currentTime
      };
    case ActionTypes.TRANSFER_META_SUCCESS:
      return {
        ...state,
        cover: action.payload.cover,
        title: action.payload.title,
        author: action.payload.author
      };
    default:
      return state;
  }
};

export default trackReducer;
