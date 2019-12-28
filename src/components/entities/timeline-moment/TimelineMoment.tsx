import React from "react";

import Timeline from "../timeline/Timeline";
import "./TimeLineMoment.scss";
import CSS from "csstype";

type TimelineMomentProps = {
  name: string;
  color: string;
  start: number;
  end: number;
  currentTime: number;
  timelineSection: number;
};

class TimelineMoment extends React.Component<TimelineMomentProps> {
  constructor(props: TimelineMomentProps) {
    super(props);
  }

  countWidth = () => {
    return (this.props.end - this.props.start) * 28;
  };

  momentWrapperStyleNormal: CSS.Properties = {
    width: `${this.countWidth()}px`,
    transform: `translate(${this.props.start * 28}px)`,
    display: "flex",
    top: `${this.props.timelineSection * 20}%`
  };

  momentContainerStyle: CSS.Properties = {};

  momentBackgroundStyle: CSS.Properties = {
    backgroundColor: this.props.color,
    borderBottom: `6px solid ${this.props.color}`
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

  render() {
    return (
      <div className="moment-wrapper" style={this.momentWrapperStyleNormal}>
        <div className="moment-container" style={this.momentContainerStyle}>
          <div
            className="moment-name-container"
            style={{ color: this.props.color }}
          >
            <div className={this.getMomentNameClass()}>{this.props.name}</div>
          </div>
          <div
            className={this.getMomentBackgroundClass()}
            style={this.momentBackgroundStyle}
          ></div>
        </div>
      </div>
    );
  }
}

export default TimelineMoment;
