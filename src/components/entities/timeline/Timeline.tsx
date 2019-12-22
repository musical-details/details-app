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

  render() {
    return (
      <div className="timeline-container">
        <div className="timeline-full"
          style={{
            width: 28 * this.props.duration,
            transform: `translate(${-(this.props.currentTime)*28 + 420}px)`,
            transition: '.25s linear'
          }}
        >
          <div className="timeline-sections-wrapper">
            <div className="timeline-section" id="timeline-section-1"
              style={{}}
            >
              <TimelineMoment
                name={"Bass"}
                color={"#9C27BD"}
                start={8000}
                end={17000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-2">
              <TimelineMoment
                name={"Drums"}
                color={"#b58000"}
                start={10000}
                end={24000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-3"
              style={{}}
            >
            <TimelineMoment
                name={"Vocals"}
                color={"#e91e63"}
                start={30000}
                end={50000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-4">
            <TimelineMoment
                name={"Bass"}
                color={"#9C27BD"}
                start={8000}
                end={17000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
              <TimelineMoment
                name={"Bass"}
                color={"#9C27BD"}
                start={17200}
                end={18000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-5"></div>
          </div>
        </div>
        <div className="timeline-pointer"></div>
      </div>
    );
  }
}

export default Timeline;
