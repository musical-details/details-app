import { userSlice } from "../index";

export type SetUsersConnectionsActionPayload = {
  userId: string;
  connections: User.Connections;
};

export const setUsersConnectionsAction = (
  payload: SetUsersConnectionsActionPayload
) => {
  return userSlice.actions.setUsersConnections(payload);
};

/** */

export type UpdateUserConnectionsActionPayload = {
  userId: string;
  nextConnections: Partial<User.Connections>;
};

export const updateUserConnectionsAction = (
  payload: UpdateUserConnectionsActionPayload
) => {
  return userSlice.actions.updateUserConnections(payload);
};
