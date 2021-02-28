import * as React from "react";
import { ITopState } from "./ITopState";
import { ITopProps } from "./ITopProps";
import "./Top.scss";

class Top extends React.Component<ITopProps, ITopState> {
  constructor(props: ITopProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Top`}>
        <h3>Top Component!</h3>
      </div>
    );
  }
}

export default Top;
