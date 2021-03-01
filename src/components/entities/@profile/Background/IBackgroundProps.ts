export type IBackgroundStateProps = {};

export type IBackgroundDispatchProps = {};

export type IBackgroundOwnProps = {
  backgroundColorThemes?: [string, string] | undefined;
  backgroundPhotoUrl?: string | undefined;
};

export type IBackgroundProps = IBackgroundStateProps &
  IBackgroundDispatchProps &
  IBackgroundOwnProps;
