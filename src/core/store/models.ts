import { Action, AnyAction } from "@reduxjs/toolkit";
import { Epic } from "redux-observable";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import rootReducer from "./rootReducer";

export type AppState = ReturnType<typeof rootReducer>;
export type AppDispatch = ThunkDispatch<AppState, undefined, Action<string>>;
export type AppEpic = Epic<AnyAction, AnyAction, AppState>;
export type AppThunkAction = ThunkAction<
  void,
  AppState,
  unknown,
  Action<string>
> & { type?: string };
