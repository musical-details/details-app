import * as React from "react";
import { IInfoBarState } from "./IInfoBarState";
import { IInfoBarProps } from "./IInfoBarProps";
import "./InfoBar.scss";

class InfoBar extends React.Component<IInfoBarProps, IInfoBarState> {
  constructor(props: IInfoBarProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`InfoBar`}>
        <h3>InfoBar Component!</h3>
      </div>
    );
  }
}

export default InfoBar;
