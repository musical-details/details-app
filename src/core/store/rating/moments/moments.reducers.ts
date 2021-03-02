import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../../utils";
import { RatingState } from "../index";
import {
  CreateRatingMomentActionPayload,
  DeleteRatingActionPayload,
  SetRatingMomentsActionPayload,
  UpdateRatingMomentActionPayload,
} from "./moments.actions";

export const setRatingMoments = (
  state: RatingState,
  { payload }: PayloadAction<SetRatingMomentsActionPayload>
) => {
  const { ratingId, moments } = payload;
  const ratingIdx: number = findIdxById(state.ratings, ratingId);
  state.ratings[ratingIdx] = {
    ...state.ratings[ratingIdx],
    moments,
  };
  return state;
};

export const createRatingMoment = (
  state: RatingState,
  { payload }: PayloadAction<CreateRatingMomentActionPayload>
) => {
  const { ratingId, newMoment } = payload;
  const ratingIdx: number = findIdxById(state.ratings, ratingId);
  state.ratings[ratingIdx].moments = [
    ...state.ratings[ratingIdx].moments,
    newMoment,
  ];
  return state;
};

export const updateRatingMoment = (
  state: RatingState,
  { payload }: PayloadAction<UpdateRatingMomentActionPayload>
) => {
  const { ratingId, momentId, nextMoment } = payload;
  const ratingIdx: number = findIdxById(state.ratings, ratingId);
  const momentIdx: number = findIdxById(
    state.ratings[ratingIdx].moments,
    momentId
  );
  state.ratings[ratingIdx].moments[momentIdx] = {
    ...state.ratings[ratingIdx].moments[momentIdx],
    ...nextMoment,
  };
  return state;
};

export const deleteRatingAction = (
  state: RatingState,
  { payload }: PayloadAction<DeleteRatingActionPayload>
) => {
  const { ratingId, momentId } = payload;
  const ratingIdx: number = findIdxById(state.ratings, ratingId);

  state.ratings[ratingIdx].moments = state.ratings[ratingIdx].moments.filter(
    (moment) => moment._id !== momentId
  );
  return state;
};

export default {
  setRatingMoments,
  createRatingMoment,
  updateRatingMoment,
  deleteRatingAction,
};
