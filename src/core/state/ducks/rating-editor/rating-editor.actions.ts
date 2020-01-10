import ActionTypes from "./rating-editor.types";
import { RatingEditorMode } from "./rating-editor.state";
import { Action } from "../../models";
import { MomentReaction, MomentColor, MomentSection } from "../../../shared";

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

const setNewMomentTimeStart = (start: number): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_START,
  payload: {
    start: start
  }
});

const setNewMomentTimeEnd = (end: number): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_START,
  payload: {
    end: end
  }
});

const setNewMomentName = (name: string): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_NAME,
  payload: {
    name: name
  }
});

const setNewMomentDescription = (description: string): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_DESCRIPTION,
  payload: {
    description: description
  }
});

const setNewMomentColor = (color: MomentColor): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_COLOR,
  payload: {
    color: color
  }
});


const setNewMomentReaction = (reaction: MomentReaction): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_REACTION,
  payload: {
    reaction: reaction
  }
});


const setNewMomentSection = (section: MomentSection): Action => ({
  type: ActionTypes.SET_NEW_MOMENT_SECTION,
  payload: {
    section: section
  }
});


export default {
  setMode,
  setSelectedTimeStart,
  setSelectedTimeEnd,
  setNewMomentTimeStart,
  setNewMomentTimeEnd,
  setNewMomentName,
  setNewMomentDescription,
  setNewMomentColor,
  setNewMomentReaction,
  setNewMomentSection
};
