import { userSlice } from "../index";

export type SetUserFavouriteTracksIdsActionPayload = {
  userId: string;
  favouriteTracksIds: string[];
};

export const setUserFavouriteTrackIdsAction = (
  payload: SetUserFavouriteTracksIdsActionPayload
) => {
  return userSlice.actions.setUserFavouriteTrackIds(payload);
};

/** */

export type CreateUserFavouriteTrackIdActionPayload = {
  userId: string;
  newFavouriteTrackId: string;
};

export const createUserFavouriteTrackIdAction = (
  payload: CreateUserFavouriteTrackIdActionPayload
) => {
  return userSlice.actions.createUserFavouriteTrackId(payload);
};

/** */

export type UpdateUserFavouriteTrackIdActionPayload = {
  userId: string;
  favouriteTrackId: string;
  nextFavouriteTrackId: string;
};

export const updateUserFavouriteTrackIdAction = (
  payload: UpdateUserFavouriteTrackIdActionPayload
) => {
  return userSlice.actions.updateUserFavouriteTrackId(payload);
};

/** */

export type DeleteUserFavouriteTrackIdActionPayload = {
  userId: string;
  favouriteTrackId: string;
};

export const deleteUserFavouriteTrackIdAction = (
  payload: DeleteUserFavouriteTrackIdActionPayload
) => {
  return userSlice.actions.deleteUserFavouriteTrackId(payload);
};
