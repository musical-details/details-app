import * as React from "react";
import { IAvatarState } from "./IAvatarState";
import { IAvatarProps } from "./IAvatarProps";
import "./Avatar.scss";

class Avatar extends React.Component<IAvatarProps, IAvatarState> {
  constructor(props: IAvatarProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`Avatar`}>
        <h3>Avatar Component!</h3>
      </div>
    );
  }
}

export default Avatar;
