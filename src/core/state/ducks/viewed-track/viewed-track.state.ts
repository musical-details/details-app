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
  readonly cover: string;
  readonly author: string;
  readonly title: string;
  readonly wave: Array<number>;
  readonly selectedRatingId: number;
  readonly ratings: Array<Rating>;
}

export const initialState: AppViewedTrackState = {
  trackId: 0,
  isSetInPlayer: false,
  cover: "",
  author: "",
  title: "",
  wave: [],
  selectedRatingId: 1,
  ratings: []
};
