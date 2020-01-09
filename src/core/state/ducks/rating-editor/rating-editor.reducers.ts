import { AppRatingEditorState, initialState } from "./rating-editor.state";
import ActionTypes from "./rating-editor.types";
import { Action } from "../../models";

const ratingEditorReducer = (
  state: AppRatingEditorState = initialState,
  action: Action
): AppRatingEditorState => {
  switch (action.type) {
    case ActionTypes.SET_MODE:
      return {
        ...state,
        mode: action.payload.mode
      };
    case ActionTypes.SET_SELECTED_TIME_START:
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          start: action.payload.selectedTimeStart
        }
      };
    case ActionTypes.SET_SELECTED_TIME_END:
      return {
        ...state,
        selectedTime: {
          ...state.selectedTime,
          end: action.payload.selectedTimeEnd
        }
      };
    default:
      return state;
  }
};

export default ratingEditorReducer;
