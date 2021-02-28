import * as React from "react";
import { IMainBannerState } from "./IMainBannerState";
import { IMainBannerProps } from "./IMainBannerProps";
import "./MainBanner.scss";

class MainBanner extends React.Component<IMainBannerProps, IMainBannerState> {
  constructor(props: IMainBannerProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`MainBanner`}>
        <h3>MainBanner Component!</h3>
      </div>
    );
  }
}

export default MainBanner;
