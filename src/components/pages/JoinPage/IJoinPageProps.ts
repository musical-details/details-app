import { RouteComponentProps } from "react-router-dom";
import {
  FeedbackError,
  LoginStage,
  RegisterStage,
} from "../../../core/store/ducks/user/user.state";

export type JoinPageRouteParams = {};

export type IJoinPageStateProps = {
  isLogged: boolean;
  loginStage: LoginStage;
  loginError: FeedbackError | undefined;
  registerStage: RegisterStage;
  registerError: FeedbackError | undefined;
};

export type IJoinPageDispatchProps = {
  signIn: (login: string, password: string) => void;
  signUp: (login: string, password: string, nickname: string) => void;
};

export type IJoinPageOwnProps = {};

export type IJoinPageProps = IJoinPageStateProps &
  IJoinPageDispatchProps &
  IJoinPageOwnProps &
  RouteComponentProps<JoinPageRouteParams>;
