import React from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";

import "./Timeline.scss";

type Moment = {
  name: string;
  color: string;
  start: number;
  end: number;
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

  //,
  // left: -this.props.currentTime / 1000 * 28,

  render() {
    return (
      <div className="timeline-container">
        <div
          className="timeline-full"
          style={{
            width: 28 * this.props.duration,
            transform: `translate(${(this.state.trackDuration - this.props.start)/1000}px)`,
          }}
        >
          <div className="timeline-sections-wrapper">
            <div
              className="timeline-section"
              id="timeline-section-1"
              style={{ backgroundColor: "violet" }}
            >
              <TimelineMoment
                name={"Bass"}
                color={"#456"}
                start={28000}
                end={30000}
                trackDuration={this.props.duration}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-2">
              <TimelineMoment
                name={"Bass"}
                color={"#459"}
                start={40000}
                end={50000}
                trackDuration={this.props.duration}
              ></TimelineMoment>
            </div>
            <div
              className="timeline-section"
              id="timeline-section-3"
              style={{ backgroundColor: "gray" }}
            ></div>
            <div className="timeline-section" id="timeline-section-4"></div>
            <div className="timeline-section" id="timeline-section-5"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
