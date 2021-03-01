export type IBottomStateProps = {};

export type IBottomDispatchProps = {};

export type IBottomOwnProps = {
  userRatings: Rating.RatingExtension[] | undefined;
};

export type IBottomProps = IBottomStateProps &
  IBottomDispatchProps &
  IBottomOwnProps;
