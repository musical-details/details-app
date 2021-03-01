export type IMainBannerStateProps = {
  ratedTracksCount: number | undefined;
  momentsCount: number | undefined;
};

export type IMainBannerDispatchProps = {};

export type IMainBannerOwnProps = {};

export type IMainBannerProps = IMainBannerStateProps &
  IMainBannerDispatchProps &
  IMainBannerOwnProps;
