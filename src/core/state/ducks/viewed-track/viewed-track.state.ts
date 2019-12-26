type Moment = {};

type Rating = {
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
  readonly selectedRating: Rating;
  readonly ratings: Array<Rating>;
}

export const initialState: AppViewedTrackState = {
  trackId: 0,
  isSetInPlayer: false,
  cover: "",
  author: "",
  title: "",
  wave: [],
  selectedRating: {
    ratingId: 0,
    user: {
      userId: 0,
      nickname: "",
      avatar: ""
    },
    moments: []
  },
  ratings: []
};
