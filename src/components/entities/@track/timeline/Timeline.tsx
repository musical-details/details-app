import React, { Dispatch, SyntheticEvent } from "react";
import { connect, ConnectedComponent } from "react-redux";

import CSS from "csstype";

import "./Timeline.scss";
import TimelineMoment from "../timeline-moment/TimelineMoment";
import TimelineTimers from "./timeline-timer";

import { AppState } from "../../../../core/store/store";
import { RatingEditorMode } from "../../../../core/store/ducks/rating-editor/rating-editor.state";
import {
  Moment,
  Seconds,
  MomentSection,
  Pixels,
} from "../../../../core/shared";
import * as tasks from "../../../../core/store/ducks/tasks";
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
  newMoment: state.ratingEditor.newMoment,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TimelineProps | any => ({
  onCancelModyfing: () => {
    dispatch(tasks.ratingEditorActions.setMode(RatingEditorMode.DISABLED));
  },
  onNewMomentSectionChange: (newSection: MomentSection) => {
    dispatch(tasks.ratingEditorActions.setNewMomentSection(newSection));
  },
  onNewMomentPositionChange: (newStart: Seconds) => {
    dispatch(tasks.ratingEditorOperations.moveMoment(newStart));
  },
  onNewMomentStartChange: (newStart: Seconds) => {
    dispatch(tasks.ratingEditorActions.setNewMomentTimeStart(newStart));
  },
  onNewMomentEndChange: (newEnd: Seconds) => {
    dispatch(tasks.ratingEditorActions.setNewMomentTimeEnd(newEnd));
  },
  onMomentContextMenu: (moment: Moment, position: { x: number; y: number }) => {
    dispatch(tasks.viewActions.showTimelineMomentContextMenu(moment, position));
  },
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
  onNewMomentPositionChange: (newStart: Seconds) => void;
  onNewMomentStartChange: (newStart: Seconds) => void;
  onNewMomentEndChange: (newEnd: Seconds) => void;
  onMomentContextMenu: (
    moment: Moment,
    position: { x: number; y: number }
  ) => void;
};

class Timeline extends React.Component<TimelineProps> {
  sectionHeight: Pixels = 70;
  secondWidth: Pixels = 28;

  constructor(props: TimelineProps) {
    super(props);
  }

  createMoments = (): Array<JSX.Element> => {
    const { moments, currentTime } = this.props;
    return moments.map((moment) => (
      <TimelineMoment
        moment={moment}
        currentTime={currentTime}
        onContextMenu={this.handleMomentContextMenu}
      />
    ));
  };

  getRecordingWrapperStyles = (): CSS.Properties => {
    const {
      currentTime,
      mode,
      selectedTimeStart,
      selectedTimeEnd,
    } = this.props;
    const { secondWidth } = this;

    switch (mode) {
      case RatingEditorMode.DISABLED:
        return {
          display: "none",
        };

      case RatingEditorMode.RECORDING:
        return {
          display: "block",
          width: `${secondWidth * currentTime -
            secondWidth * selectedTimeStart}px`,
          left: `${secondWidth * selectedTimeStart}px`,
        };

      case RatingEditorMode.MODIFYING:
        return {
          display: "block",
          width: `${secondWidth * selectedTimeEnd -
            secondWidth * selectedTimeStart}px`,
          left: `${secondWidth * selectedTimeStart}px`,
        };
    }
  };

  handleTimelineContextMenu = (event: SyntheticEvent): void => {
    event.preventDefault();
  };

  handleRecordingCancelButton = (event: React.MouseEvent): void => {
    this.props.onCancelModyfing();
  };

  handleVerticalPositionChange = (newSection: MomentSection): void => {
    this.props.onNewMomentSectionChange(newSection);
  };

  handleHorizontalPositionChange = (newStart: Seconds): void => {
    this.props.onNewMomentPositionChange(newStart);
  };

  handleLeftSideResize = (newStart: Seconds): void => {
    this.props.onNewMomentStartChange(newStart);
  };

  handleRightSideResize = (newEnd: Seconds): void => {
    this.props.onNewMomentEndChange(newEnd);
  };

  handleMomentContextMenu = (
    moment: Moment,
    position: { x: number; y: number }
  ) => {
    this.props.onMomentContextMenu(moment, position);
  };

  render() {
    const {
      secondWidth,
      handleHorizontalPositionChange,
      handleVerticalPositionChange,
      handleLeftSideResize,
      handleRightSideResize,
      handleRecordingCancelButton,
      handleMomentContextMenu,
    } = this;
    const { duration, currentTime, mode, newMoment } = this.props;

    const tapeStyles: CSS.Properties = {
      width: secondWidth * duration + "px",
      transform: `translate(${-currentTime * secondWidth + 420}px)`,
    };

    const recordingWrapperStyles: CSS.Properties = this.getRecordingWrapperStyles();

    const recordingCancelButtonStyles: CSS.Properties = {
      display: mode === RatingEditorMode.MODIFYING ? "flex" : "none",
    };

    const newMomentWrapperStyles: CSS.Properties = {
      display: mode === RatingEditorMode.MODIFYING ? "block" : "none",
    };

    return (
      <div className="timeline" onContextMenu={this.handleTimelineContextMenu}>
        <div className="timeline-container">
          <div className="tape" style={tapeStyles}>
            <div className="recording-wrapper" style={recordingWrapperStyles}>
              <div
                className="cancel-button"
                style={recordingCancelButtonStyles}
                onClick={handleRecordingCancelButton}
              >
                <i className="icon-cancel" />
              </div>
            </div>
            <div className="new-moment-wrapper" style={newMomentWrapperStyles}>
              <TimelineMomentEditable
                moment={newMoment}
                currentTime={currentTime}
                onVerticalPositionChange={handleVerticalPositionChange}
                onHorizontalPositionChange={handleHorizontalPositionChange}
                onLeftSideResize={handleLeftSideResize}
                onRightSideResize={handleRightSideResize}
                onContextMenu={handleMomentContextMenu}
              />
            </div>
            <div className="sections-wrapper">{this.createMoments()}</div>
          </div>
          <div className="pointer" />
          <div className="arrows-wrapper">
            <div className="arrow-box left">
              <div className="arrow">
                <i className="icon-left-open" />
              </div>
            </div>
            <div className="arrow-box right">
              <div className="arrow">
                <i className="icon-right-open" />
              </div>
            </div>
          </div>
        </div>
        <div className="timeline-timer-container">
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
