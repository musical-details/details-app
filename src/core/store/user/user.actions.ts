import { userSlice } from "./index";

export type SetUsersActionPayload = {
  users: User.User[];
};

export const setUsersAction = (payload: SetUsersActionPayload) => {
  return userSlice.actions.setUsers(payload);
};

/** */

export type CreateUserActionPayload = {
  newUser: User.User;
};

export const createUserAction = (payload: CreateUserActionPayload) => {
  return userSlice.actions.createUser(payload);
};

/** */

export type UpdateUserActionPayload = {
  userId: string;
  nextUser: Partial<User.User>;
};

export const updateUserAction = (payload: UpdateUserActionPayload) => {
  return userSlice.actions.updateUser(payload);
};

/** */

export type DeleteUserActionPayload = {
  userId: string;
};

export const deleteUserAction = (payload: DeleteUserActionPayload) => {
  return userSlice.actions.deleteUsers(payload);
};
