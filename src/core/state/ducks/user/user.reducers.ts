import { AppUserState, initialState } from "./user.state";
import ActionTypes from "./user.types";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const userReducer = (
  state: AppUserState = initialState,
  action: Action
): AppUserState => {
  switch (action.type) {
    case ActionTypes.REGISTER_PENDING:
      return {
        ...state,
        registerStage: action.payload.registerStage,
        registerError: undefined
      };
    case ActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        registerStage: action.payload.registerStage,
        registerError: undefined
      };
    case ActionTypes.REGISTER_REJECT:
      return {
        ...state,
        registerStage: action.payload.registerStage,
        registerError: action.payload.registerError
      };

    case ActionTypes.LOGIN_PENDING:
      return {
        ...state,
        isLogged: false,
        loginStage: action.payload.loginStage
      };

    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged: true,
        loginStage: action.payload.loginStage,
        token: action.payload.token,
        userId: -1,
        nickname: action.payload.user.nickname,
        avatar: action.payload.user.avatar
      };

    case ActionTypes.LOGIN_REJECT:
      return {
        ...state,
        isLogged: false,
        loginStage: action.payload.loginStage
      };

    case ActionTypes.LOGIN_ERROR:
      return {
        ...state,
        isLogged: false
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLogged: false,
        loginStage: action.payload.loginStage
      };

    default:
      return state;
  }
};

export default userReducer;
