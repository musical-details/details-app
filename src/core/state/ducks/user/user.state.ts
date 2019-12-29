export interface AppUserState {
  readonly isLogged: boolean;
  readonly userId: number;
  readonly nickname: string;
  readonly avatar: string;
}

export const initialState: AppUserState = {
  isLogged: false,
  userId: 0,
  nickname: "",
  avatar: ""
};
