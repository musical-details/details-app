import { Reducer } from "react";
import { AppViewState, initialState } from "./view.state";
import { AppViewActions } from "./view.actions";
import ActionTypes from "./view.types";

const viewReducer: Reducer<AppViewState | undefined, AppViewActions> = (
  state: AppViewState = initialState,
  action: AppViewActions
): AppViewState => {
  switch (action.type) {
    case ActionTypes.SHOW_TIMELINE_MOMENT_CONTEXTMENU:
      return {
        ...state,
        timelineMomentContextMenu: {
          ...state.timelineMomentContextMenu,
          isHidden: false,
          position: action.payload.position
        }
      };
    case ActionTypes.HIDE_TIMELINE_MOMENT_CONTEXTMENU:
      return {
        ...state,
        timelineMomentContextMenu: {
          ...state.timelineMomentContextMenu,
          isHidden: true
        }
      };
    case ActionTypes.SHOW_TIMELINE_MOMENT_TOOLTIP:
      return {
        ...state,
        timelineMomentTooltip: {
          ...state.timelineMomentTooltip,
          isHidden: true
        }
      };
    case ActionTypes.HIDE_TIMELINE_MOMENT_TOOLTIP:
      return {
        ...state,
        timelineMomentContextMenu: {
          ...state.timelineMomentContextMenu,
          isHidden: true
        }
      };
    case ActionTypes.HIDE_TIMELINE_MOMENT_TOOLTIP:
      return {
        ...state,
        timelineMomentContextMenu: {
          ...state.timelineMomentContextMenu,
          isHidden: true
        }
      };

    default:
      return state;
  }
};

export default viewReducer;
