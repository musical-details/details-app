import { AppState } from "../../store";
import { Moment } from "../../../shared/index";

/**
 * @description This state is responsible for the display application windows, tooltips, contextmenu's and more...
 */
export interface AppViewState {
  readonly timelineMomentContextMenu: {
    isHidden: boolean;
    position: { x: number; y: number };
    data: {
      moment: Moment | null;
    };
  };

  readonly timelineMomentTooltip: {
    isHidden: boolean;
    startPosition: { x: number; y: number };
    currentPosition: { x: number; y: number };
    data: {
      moment: Moment | null;
    };
  };
}

export const initialState: AppViewState = {
  timelineMomentContextMenu: {
    isHidden: true,
    position: { x: 0, y: 0 },
    data: {
      moment: null,
    },
  },

  timelineMomentTooltip: {
    isHidden: true,
    startPosition: { x: 0, y: 0 },
    currentPosition: { x: 0, y: 0 },
    data: {
      moment: null,
    },
  },
};

export const resetView = (state: AppState) => ({
  ...state,
  view: initialState,
});
