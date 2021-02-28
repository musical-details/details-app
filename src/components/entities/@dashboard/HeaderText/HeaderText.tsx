import * as React from "react";
import { IHeaderTextState } from "./IHeaderTextState";
import { IHeaderTextProps } from "./IHeaderTextProps";
import "./HeaderText.scss";

class HeaderText extends React.Component<IHeaderTextProps, IHeaderTextState> {
  constructor(props: IHeaderTextProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`HeaderText`}>
        <h3>HeaderText Component!</h3>
      </div>
    );
  }
}

export default HeaderText;
