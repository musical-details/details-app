import { ratingSlice } from "../index";

export type SetRatingMomentsActionPayload = {
  ratingId: string;
  moments: Rating.Moment[];
};

export const setRatingMomentsAction = (
  payload: SetRatingMomentsActionPayload
) => {
  return ratingSlice.actions.setRatingMoments(payload);
};

/** */

export type CreateRatingMomentActionPayload = {
  ratingId: string;
  newMoment: Rating.Moment;
};

export const createRatingMomentAction = (
  payload: CreateRatingMomentActionPayload
) => {
  return ratingSlice.actions.createRatingMoment(payload);
};

/** */

export type UpdateRatingMomentActionPayload = {
  ratingId: string;
  momentId: string;
  nextMoment: Partial<Rating.Moment>;
};

export const updateRatingMomentAction = (
  payload: UpdateRatingMomentActionPayload
) => {
  return ratingSlice.actions.updateRatingMoment(payload);
};

/** */

export type DeleteRatingActionPayload = {
  ratingId: string;
  momentId: string;
};

export const deleteRatingAction = (payload: DeleteRatingActionPayload) => {
  return ratingSlice.actions.deleteRatingMoment(payload);
};
