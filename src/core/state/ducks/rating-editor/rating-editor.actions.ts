import ActionTypes from "./rating-editor.types";
import { RatingEditorMode } from "./rating-editor.state";
import { Action } from "../../models";

const setAudioRecordingMode = (mode: RatingEditorMode): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING_MODE,
  payload: {
    mode: mode
  }
});

const setAudioRecordingTimeStart = (timeStart: number): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING_TIME_START,
  payload: {
    recordingTimeStart: timeStart
  }
});

const setAudioRecordingTimeEnd = (timeEnd: number): Action => ({
  type: ActionTypes.SET_AUDIO_RECORDING_TIME_END,
  payload: {
    recordingTimeEnd: timeEnd
  }
});

export default {
  setAudioRecordingMode,
  setAudioRecordingTimeStart,
  setAudioRecordingTimeEnd
};
