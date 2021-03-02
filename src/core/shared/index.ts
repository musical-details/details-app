/**@depracated */
export type Seconds = number;

/**@depracated */
export type Pixels = number;

/**@depracated */
export type Position = { x: Pixels; y: Pixels };

/**@depracated */
export enum MomentReaction {
  NONE = "None",
  SUPRRISED_FACE = "SuprisedFace",
  CRYING_FACE = "CryingFace",
  POUTING_FACE = "PoutingFace",
  LOVE = "Love",
  LAUGHING_FACE = "LaughingFace",
  THUMB_DOWN = "ThumbDown",
  THUMB_UP = "ThumbUp",
}

/**@depracated */
export type MomentSection = 0 | 1 | 2 | 3 | 4;

/**@depracated */
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

/**@depracated */
export type Moment = {
  name: string;
  description: string;
  color: MomentColor;
  reaction: MomentReaction;
  start: Seconds;
  end: Seconds;
  section: MomentSection;
};

/**@depracated */
export type Rating = {
  ratingId: number;
  user: {
    userId: number;
    nickname: string;
    avatar: string;
  };
  moments: Array<Moment>;
};

/**@depracated */
export type User = {
  nickname: string;
  login: string;
  avatar: string;
  soundcloudUri: string;
  soundcloudId: number;
  createdAt: Date;
};
