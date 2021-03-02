import ActionTypes from "./view.types";
import { Action } from "../../models";
import { Moment } from "../../../shared";

export interface ShowTimelineMomentContextMenuAction
  extends Action<ActionTypes.SHOW_TIMELINE_MOMENT_CONTEXTMENU> {
  payload: {
    position: { x: number; y: number };
    data: { moment: Moment };
  };
}

export interface HideTimelineMomentContextMenuAction
  extends Action<ActionTypes.HIDE_TIMELINE_MOMENT_CONTEXTMENU> {}

export interface ShowTimelineMomentTooltipAction
  extends Action<ActionTypes.SHOW_TIMELINE_MOMENT_TOOLTIP> {
  payload: {
    startPosition: { x: number; y: number };
    data: { moment: Moment };
  };
}

export interface HideTimelineMomentTooltipAction
  extends Action<ActionTypes.HIDE_TIMELINE_MOMENT_TOOLTIP> {}

export interface UpdateTimelineMomentTooltipAction
  extends Action<ActionTypes.UPDATE_TIMELINE_MOMENT_TOOLTIP> {
  payload: {
    currentPosition: { x: number; y: number };
  };
}

/**
 * @description Action dispatched when we can
 * display TimelineMomentContextMenu on {x, y} position
 *  with moment data
 **/
const showTimelineMomentContextMenu = (
  moment: Moment,
  position: { x: number; y: number }
): ShowTimelineMomentContextMenuAction => ({
  type: ActionTypes.SHOW_TIMELINE_MOMENT_CONTEXTMENU,
  payload: {
    position: position,
    data: { moment: moment }
  }
});

/**
 * @description Action dispatched when we can
 * hide TimelineMomentContextMenu
 **/
const hideTimelineMomentContextMenu = (): HideTimelineMomentContextMenuAction => ({
  type: ActionTypes.HIDE_TIMELINE_MOMENT_CONTEXTMENU
});

const showTimelineMomentTooltip = (
  moment: Moment,
  startPosition: { x: number; y: number }
): ShowTimelineMomentTooltipAction => ({
  type: ActionTypes.SHOW_TIMELINE_MOMENT_TOOLTIP,
  payload: {
    startPosition: startPosition,
    data: { moment: moment }
  }
});

const updateTimelineMomentTooltip = (currentPosition: {
  x: number;
  y: number;
}): UpdateTimelineMomentTooltipAction => ({
  type: ActionTypes.UPDATE_TIMELINE_MOMENT_TOOLTIP,
  payload: {
    currentPosition: currentPosition
  }
});

const hideTimelineMomentTooltip = (): HideTimelineMomentTooltipAction => ({
  type: ActionTypes.HIDE_TIMELINE_MOMENT_TOOLTIP
});

export type AppViewActions =
  | ShowTimelineMomentContextMenuAction
  | HideTimelineMomentContextMenuAction
  | ShowTimelineMomentTooltipAction
  | UpdateTimelineMomentTooltipAction
  | HideTimelineMomentTooltipAction;

export default {
  showTimelineMomentContextMenu,
  hideTimelineMomentContextMenu,
  showTimelineMomentTooltip,
  updateTimelineMomentTooltip,
  hideTimelineMomentTooltip
};
