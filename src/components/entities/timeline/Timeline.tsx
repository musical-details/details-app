import React from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import CSS from 'csstype';
import "./Timeline.scss";

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

  render() {

    let timelineFullStyles: CSS.Properties = {
      width: 28 * this.props.duration + 'px',
      transform: `translate(${-(this.props.currentTime)*28 + 420}px)`,
      transition: '.25s linear'
    }

    return (
      <div className="timeline-container">
        <div className="timeline-full" style={timelineFullStyles}>
          <div className="timeline-sections-wrapper">
            <div className="timeline-section" id="timeline-section-1">

            </div>
            <div className="timeline-section" id="timeline-section-2">

            </div>
            <div className="timeline-section" id="timeline-section-3">

            </div>
            <div className="timeline-section" id="timeline-section-4"></div>
            <div className="timeline-section" id="timeline-section-5"></div>
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
    );
  }
}

export default Timeline;
