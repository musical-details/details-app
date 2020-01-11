export type Seconds = number;

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

export type MomentSection = 0 | 1 | 2 | 3 | 4;

export type MomentColor =
  | "#202020"
  | "#5d238a"
  | "#283dc3"
  | "#38adae"
  | "#f85765"
  | "#f94922"
  | "#d12e71"
  | "#bc209b"
  | "#6a4ba2"
  | string;

export type Moment = {
  name: string;
  description: string;
  color: MomentColor;
  reaction: MomentReaction;
  start: Seconds;
  end: Seconds;
  section: MomentSection;
};

export type Rating = {
  ratingId: number;
  user: {
    userId: number;
    nickname: string;
    avatar: string;
  };
  moments: Array<Moment>;
};
