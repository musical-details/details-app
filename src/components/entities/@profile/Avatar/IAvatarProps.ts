export type IAvatarStateProps = {};

export type IAvatarDispatchProps = {};

export type IAvatarOwnProps = {
  photoUrl: string | undefined;
};

export type IAvatarProps = IAvatarStateProps &
  IAvatarDispatchProps &
  IAvatarOwnProps;
