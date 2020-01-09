import ActionTypes from "./rating-editor.types";
import { RatingEditorMode } from "./rating-editor.state";
import { Action } from "../../models";

const setMode = (mode: RatingEditorMode): Action => ({
  type: ActionTypes.SET_MODE,
  payload: {
    mode: mode
  }
});

const setSelectedTimeStart = (timeStart: number): Action => ({
  type: ActionTypes.SET_SELECTED_TIME_START,
  payload: {
    selectedTimeStart: timeStart
  }
});

const setSelectedTimeEnd = (timeEnd: number): Action => ({
  type: ActionTypes.SET_SELECTED_TIME_END,
  payload: {
    selectedTimeEnd: timeEnd
  }
});

const setNewMomentTimeStart = (timeStart: number): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_START,
  payload: {
    newMomentTimeStart: timeStart
  }
});

const setNewMomentTimeEnd = (timeEnd: number): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_END,
  payload: {
    newMomentTimeEnd: timeEnd
  }
});

export default {
  setMode,
  setSelectedTimeStart,
  setSelectedTimeEnd,
  setNewMomentTimeStart,
  setNewMomentTimeEnd
};
