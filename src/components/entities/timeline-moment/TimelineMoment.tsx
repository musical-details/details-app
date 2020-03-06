import React, { SyntheticEvent } from "react";

import "./TimeLineMoment.scss";
import CSS from "csstype";
import { Seconds, Moment } from "../../../core/shared";
import { adjustPositionToScreen } from "../../../utils";

type TimelineMomentProps = {
  moment: Moment;
  currentTime: Seconds;
  isFullWidth?: boolean;
  onContextMenu: (moment: Moment, position: { x: number; y: number }) => void;
};

class TimelineMoment extends React.Component<TimelineMomentProps> {
  constructor(props: TimelineMomentProps) {
    super(props);
  }

  countWidth = (): string => {
    const { isFullWidth } = this.props;
    const { start, end } = this.props.moment;
    return isFullWidth === true ? `100%` : `${(end - start) * 28}px`;
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

  handleContextMenu = (event: SyntheticEvent | any) => {
    event.preventDefault();
    this.props.onContextMenu(
      this.props.moment,
      adjustPositionToScreen(
        {
          x: event.clientX,
          y: event.clientY
        },
        { width: 200, height: 280 }
      )
    );
  };

  render() {
    const { name, start, section, color } = this.props.moment;
    const momentWrapperStyleNormal: CSS.Properties = {
      width: `${this.countWidth()}`,
      transform: `translate(${start * 28}px)`,
      display: "flex",
      top: `${section * 20}%`
    };

    const momentBackgroundStyle: CSS.Properties = {
      backgroundColor: color
    };

    return (
      <div
        className="moment-wrapper"
        style={momentWrapperStyleNormal}
        onContextMenu={this.handleContextMenu}
      >
        <div className="moment-container">
          <div className="moment-name-container" style={{ color: color }}>
            <div className={this.getMomentNameClass()}>
              <span>{name}</span>
            </div>
          </div>
          <div
            className={this.getMomentBackgroundClass()}
            style={momentBackgroundStyle}
          />
          <div
            className="moment-bottom-stripe"
            style={{ backgroundColor: color }}
          />
        </div>
      </div>
    );
  }
}

export default TimelineMoment;
