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

    case ActionTypes.SET_NEW_MOMENT_NAME:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          name: action.payload.name
        }
      };

    case ActionTypes.SET_NEW_MOMENT_DESCRIPTION:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          description: action.payload.description
        }
      };

    case ActionTypes.SET_NEW_MOMENT_COLOR:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          color: action.payload.color
        }
      };

    case ActionTypes.SET_NEW_MOMENT_REACTION:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          reaction: action.payload.reaction
        }
      };
    case ActionTypes.SET_NEW_MOMENT_TIME_START:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          start: action.payload.start
        }
      };
    case ActionTypes.SET_NEW_MOMENT_TIME_END:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          end: action.payload.end
        }
      };
    case ActionTypes.SET_NEW_MOMENT_SECTION:
      return {
        ...state,
        newMoment: {
          ...state.newMoment,
          section: action.payload.section
        }
      };
    default:
      return state;
  }
};

export default ratingEditorReducer;
