import { RouteComponentProps } from "react-router-dom";

export type ProfileRouteParams = {
  userId: string;
};

export type IProfilePageStateProps = {};

export type IProfilePageDispatchProps = {};

export type IProfilePageOwnProps = {};

export type IProfilePageProps = IProfilePageStateProps &
  IProfilePageDispatchProps &
  IProfilePageOwnProps &
  RouteComponentProps<ProfileRouteParams>;
