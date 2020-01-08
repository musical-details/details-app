export enum RatingEditorMode {
  DISABLED = "DISABLED",
  RECORDING = "RECORDING",
  MODIFYING = "MODIFYING"
}

export enum MomentReaction {
  NONE = "None",
  SUPRRISED_FACE = "SuprisedFace",
  CRYING_FACE = "CryingFace",
  POUTING_FACE = "PoutingFace",
  LOVE = "Love",
  LAUGHING_FACE = "LaughingFace",
  THUMB_DOWN = "ThumbDown",
  THUMB_UP = "ThumbUp"
}

export type MomentSection = 1 | 2 | 3 | 4 | 5;

export interface AppRatingEditorState {
  readonly mode: RatingEditorMode;
  readonly recordingTime: { start: number; end: number };
  readonly newMomentTime: { start: number; end: number };
  readonly selectedMomentColor: string;
  readonly selectedMomentReaction: MomentReaction;
  readonly selectedMomentSection: MomentSection;
}

export const initialState: AppRatingEditorState = {
  mode: RatingEditorMode.DISABLED,
  recordingTime: { start: 0, end: 0 },
  newMomentTime: { start: 0, end: 0 },
  selectedMomentColor: "",
  selectedMomentReaction: MomentReaction.NONE,
  selectedMomentSection: 3
};
