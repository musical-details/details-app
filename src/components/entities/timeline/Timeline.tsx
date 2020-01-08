import React, { Dispatch, ComponentClass } from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import CSS from "csstype";
import "./Timeline.scss";
import TimelineTimers from "./timeline-timer";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";

const mapStateToProps = (state: AppState): TimelineProps | any => ({
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  mode: state.ratingEditor.mode,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  moments: viewedTrackSelectors.getSelectedMoments(state),
  recordedTimeStart: state.ratingEditor.recordingTime.start,
  recordedTimeEnd: state.ratingEditor.recordingTime.end
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): TimelineProps | any => ({});

type TimelineProps = {
  isSetInPlayer: boolean;
  mode: RatingEditorMode;
  currentTime: number;
  duration: number;
  moments: Array<Moment>;
  recordedTimeStart: number;
  recordedTimeEnd: number;
};

type Moment = {
  name: string;
  color: string;
  start: number;
  end: number;
  timelineSection: number;
};

class Timeline extends React.Component<TimelineProps> {
  constructor(props: TimelineProps) {
    super(props);
  }

  createMoments = (): Array<JSX.Element> => {
    let moments: Array<JSX.Element> = [];

    for (let moment of this.props.moments) {
      moments.push(
        <TimelineMoment
          name={moment.name}
          color={moment.color}
          start={moment.start}
          end={moment.end}
          timelineSection={moment.timelineSection}
          currentTime={this.props.currentTime}
        />
      );
    }
    return moments;
  };

  render() {
    const timelineFullStyles: CSS.Properties = {
      width: 28 * this.props.duration + "px",
      transform: `translate(${-this.props.currentTime * 28 + 420}px)`
    };

    const timelineRecordingWrapperStyles: CSS.Properties = {
      display:
        this.props.mode === RatingEditorMode.RECORDING ? "block" : "none",
      width: `${28 * this.props.currentTime -
        28 * this.props.recordedTimeStart}px`,
      left: `${28 * this.props.recordedTimeStart}px`
    };

    return (
      <div className="timeline">
        <div className="timeline-container">
          <div className="timeline-full" style={timelineFullStyles}>
            <div
              className="timeline-recording-wrapper"
              style={timelineRecordingWrapperStyles}
            ></div>
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

const TimelineContainer: ConnectedComponent<typeof Timeline, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);

export default TimelineContainer;
