export type IInfoBarStateProps = {};

export type IInfoBarDispatchProps = {};

export type IInfoBarOwnProps = {
  user: User.User | undefined;
  userRatingCount: number | undefined;
  userMomentCount: number | undefined;
  onUserUpdate?: (userId: string, nextUser: Partial<User.User>) => void;
};

export type IInfoBarProps = IInfoBarStateProps &
  IInfoBarDispatchProps &
  IInfoBarOwnProps;
