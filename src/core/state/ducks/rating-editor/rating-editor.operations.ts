import { Dispatch } from "react";
import ratingActions from "./rating-editor.actions";
import trackActions from "../track/track.actions";
import { API_KEY, SoundCloud } from "../../../soundcloud";
import { AnyAction } from "redux";
import { AppState } from "../../store";
import { RatingEditorMode } from "./rating-editor.state";

function startRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): any => {
    const { isPlaying, currentTime } = getState().track;
    if (!isPlaying) {
      dispatch(trackActions.setAudioStatus(true));
    }
    dispatch(ratingActions.setAudioRecordingMode(RatingEditorMode.RECORDING));
    dispatch(ratingActions.setAudioRecordingTimeStart(currentTime));
  };
}

function stopRecording() {
  return (dispatch: Dispatch<AnyAction>, getState: () => AppState): any => {
    const { isPlaying, currentTime } = getState().track;
    dispatch(ratingActions.setAudioRecordingMode(RatingEditorMode.MODIFYING));
    dispatch(ratingActions.setAudioRecordingTimeEnd(currentTime));
  };
}

export default {
  startRecording,
  stopRecording
};
