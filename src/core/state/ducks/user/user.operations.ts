import { fetchFromApi } from "./../../../../utils/index";
import { AppState } from "./../../store";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import actions from "./user.actions";
import { FeedbackError } from "./user.state";

function signIn(login: string, password: string) {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppState
  ): Promise<void> => {
    dispatch(actions.loginPending());
    try {
      const data: {
        status: boolean;
        user?: {
          nickname: string;
          login: string;
          avatar: string;
          soundcloudUri: string;
          createdAt: Date;
        };
        token?: string;
      } = await fetchFromApi("users/authenticate", {
        method: "POST",
        body: {
          login: login,
          password: password
        }
      });
      if (!data.status) {
        dispatch(actions.loginReject());
        throw "Bad Login Data";
      }
      dispatch(actions.loginSuccess(data.user, data.token));
    } catch (error) {
      console.error(error);
      dispatch(actions.loginError(error));
    }
  };
}

function signUp(login: string, password: string, soundcloudUri: string) {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppState
  ): Promise<any> => {
    try {
      dispatch(actions.registerPending());
      const data: {
        status: boolean;
        error?: FeedbackError;
      } = await fetchFromApi("users/register", {
        method: "POST",
        body: {
          login: login,
          password: password,
          soundcloudUri: soundcloudUri
        }
      });
      if (!data.status) {
        dispatch(actions.registerReject(data.error));
        throw "Bad Register Data";
      }
      dispatch(actions.registerSuccess());
      return signIn(login, password); // TODO
    } catch (error) {
      console.error(error);
      dispatch(actions.registerError(error));
    }
  };
}

export default {
  signIn,
  signUp
};
