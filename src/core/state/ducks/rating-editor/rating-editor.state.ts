import {
  Moment,
  MomentReaction,
  MomentSection,
  Seconds
} from "../../../shared/index";

export enum RatingEditorMode {
  DISABLED = "DISABLED",
  RECORDING = "RECORDING",
  MODIFYING = "MODIFYING"
}

export interface AppRatingEditorState {
  readonly mode: RatingEditorMode;
  readonly selectedTime: { start: Seconds; end: Seconds };
  readonly newMoment: Moment;
}

export const initialState: AppRatingEditorState = {
  mode: RatingEditorMode.DISABLED,
  selectedTime: { start: 0, end: 0 },
  newMoment: {
    name: "Moment-name",
    description: "",
    color: "#202020",
    reaction: MomentReaction.NONE,
    start: 0,
    end: 0,
    section: 2
  }
};
