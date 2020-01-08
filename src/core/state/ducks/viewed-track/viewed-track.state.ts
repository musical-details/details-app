export type Moment = {
  name: string;
  description: string;
  color: string;
  start: number;
  end: number;
  timelineSection: number;
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

export interface AppViewedTrackState {
  readonly trackId: number;
  readonly isSetInPlayer: boolean;
  readonly currentTime: number;
  readonly duration: number;
  readonly cover: string;
  readonly author: string;
  readonly title: string;
  readonly wave: Array<number>;
  readonly userRatingId: number | -1;
  readonly selectedRatingId: number;
  readonly ratings: Array<Rating>;
}

export const initialState: AppViewedTrackState = {
  trackId: 0,
  isSetInPlayer: false,
  currentTime: 0,
  duration: 0,
  cover: "",
  author: "",
  title: "",
  wave: [],
  userRatingId: -1,
  selectedRatingId: 1,
  ratings: []
};
