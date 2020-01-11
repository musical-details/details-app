import React from "react";

import "./TimeLineMoment.scss";
import CSS from "csstype";
import { Seconds, Moment } from "../../../core/shared";

type TimelineMomentProps = {
  moment: Moment;
  currentTime: Seconds;
};

class TimelineMoment extends React.Component<TimelineMomentProps> {
  constructor(props: TimelineMomentProps) {
    super(props);
  }

  countWidth = () => {
    const { start, end } = this.props.moment;
    return (end - start) * 28;
  };

  getMomentBackgroundClass = (): string => {
    const { start, end } = this.props.moment;
    return this.props.currentTime >= start && this.props.currentTime <= end
      ? "moment-background highlight"
      : "moment-background";
  };

  getMomentNameClass = (): string => {
    const { start } = this.props.moment;
    return this.props.currentTime - 15 <= start
      ? "moment-name"
      : "moment-name slide";
  };

  getMomentNameStyle = (): CSS.Properties => {
    const { start, end, color } = this.props.moment;
    return this.props.currentTime >= start && this.props.currentTime <= end
      ? { color: color }
      : { color: color };
  };

  render() {
    const { name, start, section, color } = this.props.moment;
    const momentWrapperStyleNormal: CSS.Properties = {
      width: `${this.countWidth()}px`,
      transform: `translate(${start * 28}px)`,
      display: "flex",
      top: `${section * 20}%`
    };

    const momentBackgroundStyle: CSS.Properties = {
      backgroundColor: color
    };

    return (
      <div className="moment-wrapper" style={momentWrapperStyleNormal}>
        <div className="moment-container">
          <div className="moment-name-container" style={{ color: color }}>
            <div className={this.getMomentNameClass()}>
              <span>{name}</span>
            </div>
          </div>
          <div
            className={this.getMomentBackgroundClass()}
            style={momentBackgroundStyle}
          ></div>
          <div
            className="moment-bottom-stripe"
            style={{ backgroundColor: color }}
          ></div>
        </div>
      </div>
    );
  }
}

export default TimelineMoment;
