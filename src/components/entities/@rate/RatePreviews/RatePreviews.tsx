import * as React from "react";
import { IRatePreviewsState } from "./IRatePreviewsState";
import { IRatePreviewsProps } from "./IRatePreviewsProps";
import "./RatePreviews.scss";

class RatePreviews extends React.Component<
  IRatePreviewsProps,
  IRatePreviewsState
> {
  constructor(props: IRatePreviewsProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    return (
      <div className={`RatePreviews`}>
        <h3>RatePreviews Component!</h3>
      </div>
    );
  }
}

export default RatePreviews;
