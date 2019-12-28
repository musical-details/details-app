import { AppViewedTrackState, initialState } from "./viewed-track.state";
import ActionTypes from "./viewed-track.types";

const viewedTrackReducer = (
  state: AppViewedTrackState = initialState,
  action: any
): AppViewedTrackState => {
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

    case ActionTypes.FETCH_WAVE_PENDING:
      return {
        ...state
      };
    case ActionTypes.FETCH_WAVE_SUCCEESS:
      return {
        ...state,
        wave: action.payload.wave
      };
    case ActionTypes.FETCH_WAVE_ERROR:
      return {
        ...state
      };

    case ActionTypes.FETCH_RATINGS_PENDING:
      return {
        ...state
      };
    case ActionTypes.FETCH_RATINGS_SUCCEESS:
      return {
        ...state,
        ratings: action.payload.ratings
      };
    case ActionTypes.FETCH_RATINGS_ERROR:
      return {
        ...state
      };

    case ActionTypes.SET_SELECTED_RATING:
      return {
        ...state,
        selectedRatingId: action.payload.ratingId
      };

    case ActionTypes.SET_IN_PLAYER:
      return {
        ...state,
        isSetInPlayer: true
      };
    case ActionTypes.UNSET_IN_PLAYER:
      return {
        ...state,
        isSetInPlayer: false
      };
    default:
      return state;
  }
};

export default viewedTrackReducer;
