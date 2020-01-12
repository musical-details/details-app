import ActionTypes from "./viewed-track.types";
import { SoundCloud } from "../../../soundcloud";
import { Rating } from "../../../shared";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const setTrackId = (trackId: number): Action => ({
  type: ActionTypes.SET_TRACK_ID,
  payload: {
    trackId: trackId
  }
});

const fetchMetaPending = (trackId: number): Action => ({
  type: ActionTypes.FETCH_META_PENDING,
  payload: {
    trackId: trackId
  }
});

const fetchMetaSuccess = (data: SoundCloud.TrackData): Action => ({
  type: ActionTypes.FETCH_META_SUCCESS,
  payload: {
    cover: data.artwork_url.toString().replace("large", "t500x500"),
    title: data.title,
    author: data.user.username,
    duration: data.duration / 1000
  }
});

const fetchMetaError = (error: any): Action => ({
  type: ActionTypes.FETCH_META_ERROR,
  error: error
});

const fetchWavePending = (): Action => ({
  type: ActionTypes.FETCH_WAVE_PENDING
});

const fetchWaveSuccess = (wave: Array<number>): Action => ({
  type: ActionTypes.FETCH_WAVE_SUCCEESS,
  payload: {
    wave: wave
  }
});

const fetchWaveError = (error: any): Action => ({
  type: ActionTypes.FETCH_WAVE_ERROR,
  error: error
});

const fetchRatingsPending = (): Action => ({
  type: ActionTypes.FETCH_RATINGS_PENDING
});

const fetchRatingsSuccess = (ratings: Array<Rating>): Action => ({
  type: ActionTypes.FETCH_RATINGS_SUCCEESS,
  payload: {
    ratings: ratings
  }
});

const fetchRatingsError = (error: any): Action => ({
  type: ActionTypes.FETCH_RATINGS_ERROR,
  error: error
});

const setSelectedRatingId = (ratingId: number): Action => ({
  type: ActionTypes.SET_SELECTED_RATING_ID,
  payload: {
    ratingId: ratingId
  }
});

const setUserRatingId = (ratingId: number): Action => ({
  type: ActionTypes.SET_USER_RATING_ID,
  payload: {
    ratingId: ratingId
  }
});

const setInPlayer = (): Action => ({
  type: ActionTypes.SET_IN_PLAYER
});

const unsetInPlayer = (): Action => ({
  type: ActionTypes.UNSET_IN_PLAYER
});

export default {
  setTrackId,
  fetchMetaPending,
  fetchMetaSuccess,
  fetchMetaError,
  fetchWavePending,
  fetchWaveSuccess,
  fetchWaveError,
  fetchRatingsPending,
  fetchRatingsSuccess,
  fetchRatingsError,
  setInPlayer,
  setSelectedRatingId,
  setUserRatingId,
  unsetInPlayer
};
