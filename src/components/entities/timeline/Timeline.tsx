import React, { Dispatch, SyntheticEvent } from "react";
import { connect, ConnectedComponent } from "react-redux";

import CSS from "csstype";

import "./Timeline.scss";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import TimelineTimers from "./timeline-timer";

import { AppState } from "../../../core/state/store";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";
import { Moment, Seconds, MomentSection, Pixels } from "../../../core/shared";
import * as tasks from "../../../core/state/ducks/tasks";
import TimelineMomentEditable from "../timeline-moment-editable/timeline-moment-editable";

const mapStateToProps = (state: AppState): TimelineProps | any => ({
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  mode: state.ratingEditor.mode,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  soundcloudDuration: state.viewedTrack.duration,
  moments: tasks.viewedTrackSelectors.getSelectedMoments(state),
  selectedTimeStart: state.ratingEditor.selectedTime.start,
  selectedTimeEnd: state.ratingEditor.selectedTime.end,
  newMoment: state.ratingEditor.newMoment
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TimelineProps | any => ({
  onCancelModyfing: () => {
    dispatch(tasks.ratingEditorActions.setMode(RatingEditorMode.DISABLED));
  },
  onNewMomentSectionChange: (newSection: MomentSection) => {
    dispatch(tasks.ratingEditorActions.setNewMomentSection(newSection));
  },
  onNewMomentStartChange: (start: Seconds) => {
    dispatch(tasks.ratingEditorActions.setNewMomentTimeStart(start));
  }
});

type TimelineProps = {
  isSetInPlayer: boolean;
  mode: RatingEditorMode;
  currentTime: Seconds;
  duration: Seconds;
  soundclouDuration: Seconds;
  moments: Array<Moment>;
  selectedTimeStart: Seconds;
  selectedTimeEnd: Seconds;
  newMoment: Moment;
  onCancelModyfing: () => void;
  onNewMomentSectionChange: (newSection: MomentSection) => void;
  onNewMomentStartChange: (start: Seconds) => void;
};

class Timeline extends React.Component<TimelineProps> {
  sectionHeight: Pixels = 70;
  secondWidth: Pixels = 28;
  constructor(props: TimelineProps) {
    super(props);
  }

  createMoments = (): Array<JSX.Element> => {
    let moments: Array<JSX.Element> = [];

    for (let moment of this.props.moments) {
      moments.push(
        <TimelineMoment moment={moment} currentTime={this.props.currentTime} />
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
    const { secondWidth } = this;

    switch (mode) {
      case RatingEditorMode.DISABLED:
        return {
          display: "none"
        };

      case RatingEditorMode.RECORDING:
        return {
          display: "block",
          width: `${secondWidth * currentTime -
            secondWidth * selectedTimeStart}px`,
          left: `${secondWidth * selectedTimeStart}px`
        };

      case RatingEditorMode.MODIFYING:
        return {
          display: "block",
          width: `${secondWidth * selectedTimeEnd -
            secondWidth * selectedTimeStart}px`,
          left: `${secondWidth * selectedTimeStart}px`
        };
    }
  };

  handleRecordingCancelButton = (event: React.MouseEvent): void => {
    this.props.onCancelModyfing();
  };

  render() {
    const { duration, currentTime, mode, newMoment } = this.props;
    const { secondWidth } = this;
    const fullStyles: CSS.Properties = {
      width: secondWidth * duration + "px",
      transform: `translate(${-currentTime * secondWidth + 420}px)`
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
              <TimelineMomentEditable
                moment={newMoment}
                currentTime={currentTime}
                onVerticalPositionChange={() => {}}
                onHorizontalPositionChange={() => {}}
                onLeftSideResize={() => {}}
                onRightSideResize={() => {}}
              />
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
