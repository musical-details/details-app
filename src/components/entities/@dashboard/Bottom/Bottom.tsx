import * as React from "react";
import { IBottomState } from "./IBottomState";
import { IBottomProps } from "./IBottomProps";
import "./Bottom.scss";

class Bottom extends React.Component<IBottomProps, IBottomState> {
  constructor(props: IBottomProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Bottom`}>
        <h3>Bottom Component!</h3>
      </div>
    );
  }
}

export default Bottom;
