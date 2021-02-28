import * as React from "react";
import { IBackgroundState } from "./IBackgroundState";
import { IBackgroundProps } from "./IBackgroundProps";
import "./Background.scss";

class Background extends React.Component<IBackgroundProps, IBackgroundState> {
  constructor(props: IBackgroundProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Background`}>
        <h3>Background Component!</h3>
      </div>
    );
  }
}

export default Background;
