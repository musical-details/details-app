import React from "react";
import "./timeline-timer.scss";
import { listenerCount } from "cluster";
import { convertTimeFormat } from "../../../utils/index";

type TimelineTimerProps = {
  currentTime: number;
  duration: number;
};

class TimelineTimer extends React.Component<TimelineTimerProps> {
  constructor(props: TimelineTimerProps) {
    super(props);
  }

  render() {
    let countLeftTime = (): string => {
      return this.props.currentTime - 15 <= 0
        ? "00:00"
        : convertTimeFormat(this.props.currentTime - 15).substring(0, 5);
    };
    let countLeftTimeMiliSeconds = (): string => {
      return this.props.currentTime - 15 <= 0
        ? ":00"
        : convertTimeFormat(this.props.currentTime - 15).substr(5);
    };

    return (
      <div className="timeline-timer-container">
        <div className="timeline-timer-block" id="timeline-timer-left">
          {countLeftTime()}
          <div className="timeline-timer-miliseconds">
            {countLeftTimeMiliSeconds()}
          </div>
        </div>
        <div className="timeline-timer-block" id="timeline-timer-center">
          {convertTimeFormat(this.props.currentTime).substring(0, 5)}
          <div className="timeline-timer-miliseconds">
            {convertTimeFormat(this.props.currentTime).substr(5)}
          </div>
        </div>
        <div className="timeline-timer-block" id="timeline-timer-right">
          {convertTimeFormat(this.props.duration).substring(0, 5)}
          <div className="timeline-timer-miliseconds">
            {convertTimeFormat(this.props.duration).substr(5)}
          </div>
        </div>
      </div>
    );
  }
}

export default TimelineTimer;
