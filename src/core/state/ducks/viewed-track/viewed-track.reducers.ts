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
    default:
      return state;
  }
};

export default viewedTrackReducer;
