import React from "react";
import { ReactComponent } from "*.svg";

import Timeline from "../timeline/Timeline";
import "./TimeLineMoment.scss";
import CSS from "csstype";
import { start } from "repl";

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
    return ((this.props.end - this.props.start) / 1000) * 28;
  };

  render() {
    let momentContainerStyleNormal: CSS.Properties = {
      width: `${this.countWidth()}px`,
      transform: `translate(${(this.props.start * 28) / 1000}px)`,
      display: "flex",
      borderBottom: `6px solid ${this.props.color}`,
      top: `${this.props.timelineSection * 20}%`
    };

    let getMomentBackgroundClass = (): string => {
      return this.props.currentTime >= this.props.start / 1000 &&
        this.props.currentTime <= this.props.end / 1000
        ? "moment-background highlight"
        : "moment-background";
    };

    return (
      <div className="moment-container" style={momentContainerStyleNormal}>
        <div
          className="moment-name-container"
          style={{ color: this.props.color }}
        >
          <div className="moment-name">{this.props.name}</div>
        </div>
        <div
          className={getMomentBackgroundClass()}
          style={{ backgroundColor: this.props.color }}
        ></div>
      </div>
    );
  }
}

export default TimelineMoment;
