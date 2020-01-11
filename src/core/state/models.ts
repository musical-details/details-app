import { Action as ReduxAction } from "redux";

export interface Action<T> extends ReduxAction<T> {
  type: T;
  payload?: any;
  meta?: any;
  error?: boolean;
}
