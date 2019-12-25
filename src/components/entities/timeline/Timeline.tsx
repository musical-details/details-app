import React from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import CSS from 'csstype';
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
              <TimelineMoment
                name={"Bass"}
                color={"#9C27BD"}
                start={8000}
                end={17000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
              <TimelineMoment
                name={"Bass2"}
                color={"#9C27BD"}
                start={18000}
                end={20000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
              <TimelineMoment
                name={"Drums2"}
                color={"#00bcd4"}
                start={20000}
                end={24000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-2">
              <TimelineMoment
                name={"Drums"}
                color={"#00bcd4"}
                start={10000}
                end={24000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
            <div className="timeline-section" id="timeline-section-3">
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
                start={7000}
                end={17000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
              <TimelineMoment
                name={"Bass"}
                color={"#9C27BD"}
                start={17000}
                end={18000}
                currentTime={this.props.currentTime}
              ></TimelineMoment>
            </div>
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
