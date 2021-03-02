import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../../utils";
import { UserState } from "../index";
import {
  CreateUserFavouriteTrackIdActionPayload,
  DeleteUserFavouriteTrackIdActionPayload,
  SetUserFavouriteTracksIdsActionPayload,
  UpdateUserFavouriteTrackIdActionPayload,
} from "./favouriteTrackIds.actions";

export const setUserFavouriteTrackIds = (
  state: UserState,
  { payload }: PayloadAction<SetUserFavouriteTracksIdsActionPayload>
) => {
  const { userId, favouriteTracksIds } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx] = {
    ...state.users[userIdx],
    favouriteTracksIds,
  };
  return state;
};

export const createUserFavouriteTrackId = (
  state: UserState,
  { payload }: PayloadAction<CreateUserFavouriteTrackIdActionPayload>
) => {
  const { userId, newFavouriteTrackId } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx].favouriteTracksIds = [
    ...state.users[userIdx].favouriteTracksIds,
    newFavouriteTrackId,
  ];
  return state;
};

export const updateUserFavouriteTrackId = (
  state: UserState,
  { payload }: PayloadAction<UpdateUserFavouriteTrackIdActionPayload>
) => {
  const { userId, favouriteTrackId, nextFavouriteTrackId } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  const favouriteTrackIdx: number = state.users[
    userIdx
  ].favouriteTracksIds.findIndex((id) => id === favouriteTrackId);
  state.users[userIdx].favouriteTracksIds[
    favouriteTrackIdx
  ] = nextFavouriteTrackId;
  return state;
};

export const deleteUserFavouriteTrackId = (
  state: UserState,
  { payload }: PayloadAction<DeleteUserFavouriteTrackIdActionPayload>
) => {
  const { userId, favouriteTrackId } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx].favouriteTracksIds = state.users[
    userIdx
  ].favouriteTracksIds.filter((id) => favouriteTrackId !== id);
  return state;
};

export default {
  setUserFavouriteTrackIds,
  createUserFavouriteTrackId,
  updateUserFavouriteTrackId,
  deleteUserFavouriteTrackId,
};
