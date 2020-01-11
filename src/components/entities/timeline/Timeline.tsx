import React, { Dispatch, ComponentClass } from "react";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import CSS from "csstype";
import "./Timeline.scss";
import TimelineTimers from "./timeline-timer";
import { AppState } from "../../../core/state/store";
import { connect, ConnectedComponent } from "react-redux";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";
import Draggable from "react-draggable";
import { Moment } from "../../../core/shared";
import * as tasks from "../../../core/state/ducks/tasks";

const mapStateToProps = (state: AppState): TimelineProps | any => ({
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  mode: state.ratingEditor.mode,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  moments: tasks.viewedTrackSelectors.getSelectedMoments(state),
  selectedTimeStart: state.ratingEditor.selectedTime.start,
  selectedTimeEnd: state.ratingEditor.selectedTime.end,
  newMoment: state.ratingEditor.newMoment
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TimelineProps | any => ({
  onCancelModyfing: () => {
    dispatch(tasks.ratingEditorActions.setMode(RatingEditorMode.DISABLED));
  }
});

type TimelineProps = {
  isSetInPlayer: boolean;
  mode: RatingEditorMode;
  currentTime: number;
  duration: number;
  moments: Array<Moment>;
  selectedTimeStart: number;
  selectedTimeEnd: number;
  newMoment: Moment;
  onCancelModyfing: () => void;
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
          section={moment.section}
          currentTime={this.props.currentTime}
        />
      );
    }
    return moments;
  };

  getRecordingWrapperStyles = (): CSS.Properties => {
    const {
      currentTime,
      mode,
      selectedTimeStart,
      selectedTimeEnd
    } = this.props;

    switch (mode) {
      case RatingEditorMode.DISABLED:
        return {
          display: "none"
        };

      case RatingEditorMode.RECORDING:
        return {
          display: "block",
          width: `${28 * currentTime - 28 * selectedTimeStart}px`,
          left: `${28 * selectedTimeStart}px`
        };

      case RatingEditorMode.MODIFYING:
        return {
          display: "block",
          width: `${28 * selectedTimeEnd - 28 * selectedTimeStart}px`,
          left: `${28 * selectedTimeStart}px`
        };
    }
  };

  handleRecordingCancelButton = (event: React.MouseEvent): void => {
    this.props.onCancelModyfing();
  };

  render() {
    const { duration, currentTime, mode } = this.props;
    const fullStyles: CSS.Properties = {
      width: 28 * duration + "px",
      transform: `translate(${-currentTime * 28 + 420}px)`
    };

    const recordingWrapperStyles: CSS.Properties = this.getRecordingWrapperStyles();

    const recordingCancelButtonStyles: CSS.Properties = {
      display: mode === RatingEditorMode.MODIFYING ? "flex" : "none"
    };

    const newMomentWrapperStyles: CSS.Properties = {
      display: mode === RatingEditorMode.MODIFYING ? "block" : "none"
    };

    return (
      <div className="timeline">
        <div className="timeline-container">
          <div className="timeline-full" style={fullStyles}>
            <div
              className="timeline-recording-wrapper"
              style={recordingWrapperStyles}
            >
              <div
                className="cancel-button"
                style={recordingCancelButtonStyles}
                onClick={this.handleRecordingCancelButton}
              >
                <i className="icon-cancel"></i>
              </div>
            </div>
            <div className="new-moment-wrapper" style={newMomentWrapperStyles}>
              <Draggable axis="x" bounds=".timeline-recording-wrapper">
                <TimelineMoment
                  name={this.props.newMoment.name}
                  color={this.props.newMoment.color}
                  start={this.props.newMoment.start}
                  end={this.props.newMoment.end}
                  section={this.props.newMoment.section}
                  currentTime={this.props.currentTime}
                />
              </Draggable>
            </div>
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
