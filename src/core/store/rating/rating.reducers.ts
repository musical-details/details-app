import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../utils";
import { RatingState } from "./index";
import {
  CreateRatingActionPayload,
  DeleteRatingActionPayload,
  SetRatingsActionPayload,
  UpdateRatingActionPayload,
} from "./rating.actions";

export const setRatings = (
  state: RatingState,
  { payload }: PayloadAction<SetRatingsActionPayload>
) => {
  const { ratings } = payload;
  state.ratings = ratings;
  return state;
};

export const createRating = (
  state: RatingState,
  { payload }: PayloadAction<CreateRatingActionPayload>
) => {
  const { newRating } = payload;
  state.ratings = [...state.ratings, newRating];
  return state;
};

export const updateRating = (
  state: RatingState,
  { payload }: PayloadAction<UpdateRatingActionPayload>
) => {
  const { ratingId, nextRating } = payload;
  const ratingIdx: number = findIdxById(state.ratings, ratingId);
  state.ratings[ratingIdx] = { ...state.ratings[ratingIdx], ...nextRating };
  return state;
};

export const deleteRating = (
  state: RatingState,
  { payload }: PayloadAction<DeleteRatingActionPayload>
) => {
  const { ratingId } = payload;
  state.ratings = state.ratings.filter((rating) => rating._id !== ratingId);
  return state;
};

export default {
  setRatings,
  createRating,
  updateRating,
  deleteRating,
};
