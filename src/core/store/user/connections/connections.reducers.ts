import { PayloadAction } from "@reduxjs/toolkit";
import { findIdxById } from "../../../../utils";
import { UserState } from "../index";
import {
  SetUsersConnectionsActionPayload,
  UpdateUserConnectionsActionPayload,
} from "./connections.actions";

export const setUsersConnections = (
  state: UserState,
  { payload }: PayloadAction<SetUsersConnectionsActionPayload>
) => {
  const { userId, connections } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx].connections = connections;
  return state;
};

export const updateUserConnections = (
  state: UserState,
  { payload }: PayloadAction<UpdateUserConnectionsActionPayload>
) => {
  const { userId, nextConnections } = payload;
  const userIdx: number = findIdxById(state.users, userId);
  state.users[userIdx].connections = {
    ...state.users[userIdx].connections,
    ...nextConnections,
  };
  return state;
};

export default {
  setUsersConnections,
  updateUserConnections,
};
