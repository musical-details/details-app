export enum LoginStage {
  NOT_LOGGED = "NOT_LOGGED",
  PENDING = "PENDING",
  REJECT = "REJECT",
  SUCCESS = "SUCCESS"
}

export enum RegisterStage {
  NOT_REGISTER = "NOT_REGISTERED",
  PENDING = "PENDING",
  REJECT = "REJECT",
  SUCCESS = "SUCCESS"
}

export type FeedbackError = {
  id: number;
  message?: string;
};

export interface AppUserState {
  readonly isLogged: boolean;
  readonly loginStage: LoginStage;
  readonly loginError: undefined | FeedbackError;
  readonly registerStage: RegisterStage;
  readonly registerError: undefined | FeedbackError;
  readonly token: string;
  readonly userId: number;
  readonly soundcloudId: number;
  readonly nickname: string;
  readonly avatar: string;
}

export const initialState: AppUserState = {
  isLogged: false,
  loginStage: LoginStage.NOT_LOGGED,
  loginError: undefined,
  registerStage: RegisterStage.NOT_REGISTER,
  registerError: undefined,
  token: "",
  userId: 0,
  soundcloudId: 0,
  nickname: "",
  avatar: ""
};
