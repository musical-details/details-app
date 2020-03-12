import { LoginStage, RegisterStage, FeedbackError } from "./user.state";
import ActionTypes from "./user.types";
import { User } from "../../../shared";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const registerPending = (): Action => ({
  type: ActionTypes.REGISTER_PENDING,
  payload: {
    registerStage: RegisterStage.PENDING
  }
});

const registerSuccess = (): Action => ({
  type: ActionTypes.REGISTER_SUCCESS,
  payload: {
    registerStage: RegisterStage.SUCCESS
  }
});

const registerReject = (error?: FeedbackError): Action => ({
  type: ActionTypes.REGISTER_REJECT,
  payload: {
    registerStage: RegisterStage.REJECT,
    registerError: error
  }
});

const registerError = (error: any): Action => ({
  type: ActionTypes.REGISTER_ERROR,
  error: error
});

const loginPending = (): Action => ({
  type: ActionTypes.LOGIN_PENDING,
  payload: {
    loginStage: LoginStage.PENDING
  }
});

const loginSuccess = (
  user: User | undefined,
  token: string | undefined
): Action => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: {
    loginStage: LoginStage.SUCCESS,
    user: user,
    token: token
  }
});

const loginReject = (error?: FeedbackError): Action => ({
  type: ActionTypes.LOGIN_REJECT,
  payload: {
    loginStage: LoginStage.REJECT,
    loginError: error
  }
});

const loginError = (error: any): Action => ({
  type: ActionTypes.LOGIN_ERROR,
  error: error
});

const logout = (): Action => ({
  type: ActionTypes.LOGOUT,
  payload: {
    loginStage: LoginStage.NOT_LOGGED
  }
});

export default {
  registerPending,
  registerSuccess,
  registerReject,
  registerError,
  loginPending,
  loginSuccess,
  loginReject,
  loginError,
  logout
};
