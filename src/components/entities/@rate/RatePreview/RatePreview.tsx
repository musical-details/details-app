import * as React from "react";
import { IRatePreviewState } from "./IRatePreviewState";
import { IRatePreviewProps } from "./IRatePreviewProps";
import "./RatePreview.scss";

class RatePreview extends React.Component<
  IRatePreviewProps,
  IRatePreviewState
> {
  constructor(props: IRatePreviewProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`RatePreview`}>
        <h3>RatePreview Component!</h3>
      </div>
    );
  }
}

export default RatePreview;
