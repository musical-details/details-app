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

  momentWrapperStyleNormal: CSS.Properties = {
    width: `${this.countWidth()}px`,
    transform: `translate(${(this.props.start * 28) / 1000}px)`,
    display: "flex",
    top: `${this.props.timelineSection * 20}%`
  };

  momentBackgroundStyle: CSS.Properties = {
    backgroundColor: this.props.color ,
  }

  getMomentBackgroundClass = (): string => {
    return this.props.currentTime >= this.props.start / 1000 &&
      this.props.currentTime <= this.props.end / 1000
      ? "moment-background highlight"
      : "moment-background";
  };

  getMomentNameClass = (): string => {
    return this.props.currentTime - 15 <= this.props.start / 1000 
    ? "moment-name"
    : "moment-name slide";
  }

  getMomentNameStyle = (): CSS.Properties => {
    return this.props.currentTime >= this.props.start / 1000 &&
    this.props.currentTime <= this.props.end / 1000
    ? {color: this.props.color }
    : {color: this.props.color };
  }

  render() {
    return (
      <div className="moment-wrapper" style={this.momentWrapperStyleNormal}>
        <div className="moment-container">
        <div className="moment-name-container" style={{ color: this.props.color }}>
          <div className={this.getMomentNameClass()}>{this.props.name}</div>
        </div>
          <div className={this.getMomentBackgroundClass()} style={this.momentBackgroundStyle}>
            </div>
            <div className="moment-bottom-stripe" style={{backgroundColor: this.props.color}}></div>
        </div>
      </div>
    );
  }
}

export default TimelineMoment;
