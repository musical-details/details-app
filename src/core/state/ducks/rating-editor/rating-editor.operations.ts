import { Dispatch } from "react";
import ratingActions from "./rating-editor.actions";
import trackActions from "../track/track.actions";
import viewedTackActions from "../viewed-track/viewed-track.actions";
import { AnyAction } from "redux";
import { AppState } from "../../store";
import { RatingEditorMode } from "./rating-editor.state";

function startRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): any => {
    const { currentTime } = getState().track;
    const { selectedRatingId, userRatingId } = getState().viewedTrack;
    if (userRatingId !== selectedRatingId) {
      dispatch(viewedTackActions.setSelectedRatingId(userRatingId));
    }
    dispatch(ratingActions.setMode(RatingEditorMode.RECORDING));
    dispatch(ratingActions.setSelectedTimeStart(currentTime));
  };
}

function stopRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): any => {
    const { isPlaying, currentTime } = getState().track;
    dispatch(ratingActions.setMode(RatingEditorMode.MODIFYING));
    dispatch(ratingActions.setSelectedTimeEnd(currentTime));
  };
}

export default {
  startRecording,
  stopRecording
};
