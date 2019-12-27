import React from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import CSS from "csstype";
import "./Timeline.scss";
import TimelineTimers from "./timeline-timer";

type Moment = {
  name: string;
  color: string;
  start: number;
  end: number;
  timelineSection: number;
};

type Track = {
  length: number;
};

type TimelineProps = {
  duration: number;
  moment: Array<Moment>;
  currentTime: number;
};

class Timeline extends React.Component<TimelineProps> {
  constructor(props: TimelineProps) {
    super(props);
    console.log(this.props.duration);
  }

  createMoments = (): Array<JSX.Element> => {
    let moments: Array<JSX.Element> = [];

    for( let i = 0; i<this.props.moment.length; ++i) {
      moments.push(
        <TimelineMoment
          name={this.props.moment[i].name}
          color={this.props.moment[i].color}
          start={this.props.moment[i].start}
          end={this.props.moment[i].end}
          timelineSection={this.props.moment[i].timelineSection}
          currentTime={this.props.currentTime}
        />
      );
    }
    return moments;
  }

  render() {
    let timelineFullStyles: CSS.Properties = {
      width: 28 * this.props.duration + "px",
      transform: `translate(${-this.props.currentTime * 28 + 420}px)`
    };

    return (
      <div className="timeline">
        <div className="timeline-container">
          <div className="timeline-full" style={timelineFullStyles}>
            <div className="timeline-sections-wrapper">
              <div className="timeline-sections-container">
              {this.createMoments()}
              </div>
            </div>
          </div>
          <div className="timeline-pointer"></div>
          <div className="timeline-arrow left">
            <div className="timeline-arrow-box">
              <i className="icon-left-open"></i>
            </div>
          </div>
          <div className="timeline-arrow right">
            <div className="timeline-arrow-box">
              <i className="icon-right-open"></i>
            </div>
          </div>
        </div>
        <div className="timeline-timer-box">
          <TimelineTimers currentTime={this.props.currentTime} />
        </div>
      </div>
    );
  }
}

export default Timeline;
