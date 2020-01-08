import { AppRatingEditorState, initialState } from "./rating-editor.state";
import ActionTypes from "./rating-editor.types";
import { Action } from "../../models";

const ratingEditorReducer = (
  state: AppRatingEditorState = initialState,
  action: Action
): AppRatingEditorState => {
  switch (action.type) {
    case ActionTypes.SET_AUDIO_RECORDING_MODE:
      return {
        ...state,
        mode: action.payload.mode
      };
    case ActionTypes.SET_AUDIO_RECORDING_TIME_START:
      return {
        ...state,
        recordingTime: {
          ...state.recordingTime,
          start: action.payload.recordingTimeStart
        }
      };
    case ActionTypes.SET_AUDIO_RECORDING_TIME_END:
      return {
        ...state,
        recordingTime: {
          ...state.recordingTime,
          end: action.payload.recordingTimeEnd
        }
      };
    default:
      return state;
  }
};

export default ratingEditorReducer;
