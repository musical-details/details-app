import React from "react";
import "./timeline-timer.scss";
import { convertToMMSSMS } from "../../../utils/index";

type TimelineTimerProps = {
  time: number;
};

type TimelineTimersProps = {
  currentTime: number;
};

const TimelineTimer: React.FC<TimelineTimerProps> = (
  props: TimelineTimerProps
) => {
  const time = convertToMMSSMS(props.time);
  return (
    <div className="timeline-timer-block">
      {time.signed}
      {time.m}:{time.s}:
      <span className="timeline-timer-miliseconds">{time.ms}</span>
    </div>
  );
};

class TimelineTimers extends React.Component<TimelineTimersProps> {
  constructor(props: TimelineTimersProps) {
    super(props);
  }

  render() {
    return (
      <div className="timeline-timer-container">
        <TimelineTimer time={this.props.currentTime - 15} />
        <TimelineTimer time={this.props.currentTime} />
        <TimelineTimer time={this.props.currentTime + 15} />
      </div>
    );
  }
}

export default TimelineTimers;
