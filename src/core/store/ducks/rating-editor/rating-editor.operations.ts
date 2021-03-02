import { Dispatch } from "react";

import ratingEditorActions from "./rating-editor.actions";
import trackActions from "../track/track.actions";
import viewedTackActions from "../viewed-track/viewed-track.actions";
import { AnyAction } from "redux";
import { AppState } from "../../store";
import { RatingEditorMode } from "./rating-editor.state";
import { Seconds } from "../../../shared";

function startRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): void => {
    const { currentTime } = getState().track;
    const { selectedRatingId, userRatingId } = getState().viewedTrack;
    if (userRatingId !== selectedRatingId) {
      dispatch(viewedTackActions.setSelectedRatingId(userRatingId));
    }
    dispatch(ratingEditorActions.setMode(RatingEditorMode.RECORDING));
    dispatch(ratingEditorActions.setSelectedTimeStart(currentTime));
  };
}

function stopRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): void => {
    const { currentTime } = getState().track;
    const { selectedTime } = getState().ratingEditor;
    if (currentTime === selectedTime.start) {
      dispatch(ratingEditorActions.setMode(RatingEditorMode.DISABLED));
      return;
    }

    dispatch(ratingEditorActions.setMode(RatingEditorMode.MODIFYING));
    dispatch(ratingEditorActions.setSelectedTimeEnd(currentTime));
    dispatch(ratingEditorActions.setNewMomentTimeStart(selectedTime.start));
    dispatch(ratingEditorActions.setNewMomentTimeEnd(currentTime));
    dispatch(ratingEditorActions.resetMomentEditor());
  };
}

function moveMoment(nextStart: Seconds) {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): void => {
    const { newMoment } = getState().ratingEditor;
    const prevStart: Seconds = newMoment.start;
    const diff: Seconds = nextStart - prevStart;
    const prevEnd: Seconds = newMoment.end;
    const nextEnd: Seconds = prevEnd + diff;
    dispatch(ratingEditorActions.setNewMomentTimeStart(nextStart));
    dispatch(ratingEditorActions.setNewMomentTimeEnd(nextEnd));
  };
}

export default {
  startRecording,
  stopRecording,
  moveMoment
};
