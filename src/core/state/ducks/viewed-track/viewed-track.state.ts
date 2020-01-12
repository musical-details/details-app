import { Rating } from "../../../shared";

export interface AppViewedTrackState {
  readonly trackId: number;
  readonly isSetInPlayer: boolean;
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
  duration: 0,
  cover: "",
  author: "",
  title: "",
  wave: [],
  userRatingId: -1,
  selectedRatingId: 1,
  ratings: []
};
