import { ratingSlice } from "./index";

export type SetRatingsActionPayload = {
  ratings: Rating.Rating[];
};

export const setRatingsAction = (payload: SetRatingsActionPayload) => {
  return ratingSlice.actions.setRatings(payload);
};

/** */

export type CreateRatingActionPayload = {
  newRating: Rating.Rating;
};

export const createRatingAction = (payload: CreateRatingActionPayload) => {
  return ratingSlice.actions.createRating(payload);
};

/** */

export type UpdateRatingActionPayload = {
  ratingId: string;
  nextRating: Partial<Rating.Rating>;
};

export const updateRatingAction = (payload: UpdateRatingActionPayload) => {
  return ratingSlice.actions.updateRating(payload);
};

/** */

export type DeleteRatingActionPayload = {
  ratingId: string;
};

export const deleteRatingAction = (payload: DeleteRatingActionPayload) => {
  return ratingSlice.actions.deleteRatings(payload);
};
