import React from "react";

import "./TimeLineMoment.scss";
import CSS from "csstype";
import { MomentColor, Seconds, MomentSection } from "../../../core/shared";

type TimelineMomentProps = {
  name: string;
  color: MomentColor;
  start: Seconds;
  end: Seconds;
  currentTime: Seconds;
  section: MomentSection;
};

class TimelineMoment extends React.Component<TimelineMomentProps> {
  constructor(props: TimelineMomentProps) {
    super(props);
  }

  countWidth = () => {
    return (this.props.end - this.props.start) * 28;
  };

  getMomentBackgroundClass = (): string => {
    return this.props.currentTime >= this.props.start &&
      this.props.currentTime <= this.props.end
      ? "moment-background highlight"
      : "moment-background";
  };

  getMomentNameClass = (): string => {
    return this.props.currentTime - 15 <= this.props.start
      ? "moment-name"
      : "moment-name slide";
  };

  getMomentNameStyle = (): CSS.Properties => {
    return this.props.currentTime >= this.props.start &&
      this.props.currentTime <= this.props.end
      ? { color: this.props.color }
      : { color: this.props.color };
  };

  render() {
    const momentWrapperStyleNormal: CSS.Properties = {
      width: `${this.countWidth()}px`,
      transform: `translate(${this.props.start * 28}px)`,
      display: "flex",
      top: `${this.props.section * 20}%`
    };

    const momentBackgroundStyle: CSS.Properties = {
      backgroundColor: this.props.color
    };

    return (
      <div className="moment-wrapper" style={momentWrapperStyleNormal}>
        <div className="moment-container">
          <div
            className="moment-name-container"
            style={{ color: this.props.color }}
          >
            <div className={this.getMomentNameClass()}>
              <span>{this.props.name}</span>
            </div>
          </div>
          <div
            className={this.getMomentBackgroundClass()}
            style={momentBackgroundStyle}
          ></div>
          <div
            className="moment-bottom-stripe"
            style={{ backgroundColor: this.props.color }}
          ></div>
        </div>
      </div>
    );
  }
}

export default TimelineMoment;
