import ActionTypes from "./rating-editor.types";
import { Action } from "../../models";
import {
  MomentReaction,
  MomentColor,
  MomentSection,
  Seconds
} from "../../../shared";
import { RatingEditorMode } from "./rating-editor.state";

export interface setModeAction extends Action<ActionTypes.SET_MODE> {
  payload: {
    mode: RatingEditorMode;
  };
}

export interface setSelectedTimeStartAction
  extends Action<ActionTypes.SET_SELECTED_TIME_START> {
  payload: {
    start: Seconds;
  };
}

export interface setSelectedTimeEndAction
  extends Action<ActionTypes.SET_SELECTED_TIME_END> {
  payload: {
    end: Seconds;
  };
}

export interface setNewMomentTimeStartAction
  extends Action<ActionTypes.SET_NEW_MOMENT_TIME_START> {
  payload: {
    start: Seconds;
  };
}

export interface setNewMomentTimeEndAction
  extends Action<ActionTypes.SET_NEW_MOMENT_TIME_END> {
  payload: {
    end: Seconds;
  };
}

export interface setNewMomentNameAction
  extends Action<ActionTypes.SET_NEW_MOMENT_NAME> {
  payload: {
    name: string;
  };
}

export interface setNewMomentDescriptionAction
  extends Action<ActionTypes.SET_NEW_MOMENT_DESCRIPTION> {
  payload: {
    description: string;
  };
}

export interface setNewMomentColorAction
  extends Action<ActionTypes.SET_NEW_MOMENT_COLOR> {
  payload: {
    color: MomentColor;
  };
}

export interface setNewMomentReactionAction
  extends Action<ActionTypes.SET_NEW_MOMENT_REACTION> {
  payload: {
    reaction: MomentReaction;
  };
}

export interface setNewMomentSectionAction
  extends Action<ActionTypes.SET_NEW_MOMENT_SECTION> {
  payload: {
    section: MomentSection;
  };
}

const setMode = (mode: RatingEditorMode): setModeAction => ({
  type: ActionTypes.SET_MODE,
  payload: {
    mode: mode
  }
});

const setSelectedTimeStart = (start: Seconds): setSelectedTimeStartAction => ({
  type: ActionTypes.SET_SELECTED_TIME_START,
  payload: {
    start: start
  }
});

const setSelectedTimeEnd = (end: Seconds): setSelectedTimeEndAction => ({
  type: ActionTypes.SET_SELECTED_TIME_END,
  payload: {
    end: end
  }
});

const setNewMomentTimeStart = (
  start: Seconds
): setNewMomentTimeStartAction => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_START,
  payload: {
    start: start
  }
});

const setNewMomentTimeEnd = (end: Seconds): setNewMomentTimeEndAction => ({
  type: ActionTypes.SET_NEW_MOMENT_TIME_END,
  payload: {
    end: end
  }
});

const setNewMomentName = (name: string): setNewMomentNameAction => ({
  type: ActionTypes.SET_NEW_MOMENT_NAME,
  payload: {
    name: name
  }
});

const setNewMomentDescription = (
  description: string
): setNewMomentDescriptionAction => ({
  type: ActionTypes.SET_NEW_MOMENT_DESCRIPTION,
  payload: {
    description: description
  }
});

const setNewMomentColor = (color: MomentColor): setNewMomentColorAction => ({
  type: ActionTypes.SET_NEW_MOMENT_COLOR,
  payload: {
    color: color
  }
});

const setNewMomentReaction = (
  reaction: MomentReaction
): setNewMomentReactionAction => ({
  type: ActionTypes.SET_NEW_MOMENT_REACTION,
  payload: {
    reaction: reaction
  }
});

const setNewMomentSection = (
  section: MomentSection
): setNewMomentSectionAction => ({
  type: ActionTypes.SET_NEW_MOMENT_SECTION,
  payload: {
    section: section
  }
});

export type AppRatingEdtiorActions =
  | setModeAction
  | setSelectedTimeStartAction
  | setSelectedTimeEndAction
  | setNewMomentTimeStartAction
  | setNewMomentTimeEndAction
  | setNewMomentNameAction
  | setNewMomentDescriptionAction
  | setNewMomentColorAction
  | setNewMomentReactionAction
  | setNewMomentSectionAction;

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
