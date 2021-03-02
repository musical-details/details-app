import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../utils";
import { UserState } from "./index";
import {
  CreateUserActionPayload,
  DeleteUserActionPayload,
  SetUsersActionPayload,
  UpdateUserActionPayload,
} from "./user.actions";

export const setUsers = (
  state: UserState,
  { payload }: PayloadAction<SetUsersActionPayload>
) => {
  const { users } = payload;
  state.users = users;
  return state;
};

export const createUser = (
  state: UserState,
  { payload }: PayloadAction<CreateUserActionPayload>
) => {
  const { newUser } = payload;
  state.users = [...state.users, newUser];
  return state;
};

export const updateUser = (
  state: UserState,
  { payload }: PayloadAction<UpdateUserActionPayload>
) => {
  const { userId, nextUser } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx] = { ...state.users[userIdx], ...nextUser };
  return state;
};

export const deleteUser = (
  state: UserState,
  { payload }: PayloadAction<DeleteUserActionPayload>
) => {
  const { userId } = payload;
  state.users = state.users.filter((user) => user._id !== userId);
  return state;
};

export default {
  setUsers,
  createUser,
  updateUser,
  deleteUser,
};
