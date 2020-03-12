import React, { Dispatch } from "react";
import { connect, ConnectedComponent } from "react-redux";
import CSS from "csstype";

import "./moment-editor.scss";

import { AppState } from "../../../core/state/store";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";
import * as tasks from "../../../core/state/ducks/tasks";

import colorsData from "../../../assets/data/moment-colors.json";
import reactionsData from "../../../assets/data/moment-reactions.json";

import { convertToMMSSMS, convertToSeconds } from "../../../utils/index";
import {
  Moment,
  MomentColor,
  MomentSection,
  MomentReaction
} from "../../../core/shared";

const mapStateToProps = (state: AppState): MomentEditorProps | any => ({
  currentTime: state.track.currentTime,
  mode: state.ratingEditor.mode,
  selectedTimeStart: state.ratingEditor.selectedTime.start,
  selectedTimeEnd: state.ratingEditor.selectedTime.end,
  newMoment: state.ratingEditor.newMoment
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  onNameChange: (name: string) => {
    dispatch(tasks.ratingEditorActions.setNewMomentName(name));
  },
  onDescriptionChange: (description: string) => {
    dispatch(tasks.ratingEditorActions.setNewMomentDescription(description));
  },
  onColorChange: (newColor: MomentColor) => {
    dispatch(tasks.ratingEditorActions.setNewMomentColor(newColor));
  },
  onReactionChange: (newReaction: MomentReaction) => {
    dispatch(tasks.ratingEditorActions.setNewMomentReaction(newReaction));
  },
  onSectionChange: (newSection: MomentSection) => {
    dispatch(tasks.ratingEditorActions.setNewMomentSection(newSection));
  },

  newCurrentTime: (time: number) => {
    dispatch(tasks.trackActions.setAudioNewTime(time));
  },
  newRecordingTimeStart: (time: number) => {
    dispatch(tasks.ratingEditorActions.setSelectedTimeStart(time));
  },
  newRecordingTimeEnd: (time: number) => {
    dispatch(tasks.ratingEditorActions.setSelectedTimeEnd(time));
  }
});

type MomentEditorProps = {
  currentTime: number;
  mode: RatingEditorMode;
  selectedTimeStart: number;
  selectedTimeEnd: number;
  newMoment: Moment;
  onNameChange: (name: string) => void;
  onDescriptionChange: (description: string) => void;
  onColorChange: (newColor: MomentColor) => void;
  onReactionChange: (newReaction: MomentReaction) => void;
  onSectionChange: (newSection: MomentSection) => void;
  newCurrentTime: (time: number) => void;
  newRecordingTimeStart: (time: number) => void;
  newRecordingTimeEnd: (time: number) => void;
};

type MomentEditorState = {};

type timeValueInputProps = {
  recordingValueArg: number;
  editingValueArg: number;
  handleTypeArg: (event: React.KeyboardEvent) => void;
};

class MomentEditor extends React.Component<
  MomentEditorProps,
  MomentEditorState
> {
  startMinutesRef: React.RefObject<HTMLInputElement>;
  startSecondsRef: React.RefObject<HTMLInputElement>;
  startMilisecondsRef: React.RefObject<HTMLInputElement>;
  endMinutesRef: React.RefObject<HTMLInputElement>;
  endSecondsRef: React.RefObject<HTMLInputElement>;
  endMilisecondsRef: React.RefObject<HTMLInputElement>;

  defaultColor: string;
  defaultReaction: MomentReaction;
  defaultSection: MomentSection;

  constructor(props: MomentEditorProps) {
    super(props);
    this.defaultColor = "#ffffff8a";
    this.defaultReaction = MomentReaction.NONE;
    this.defaultSection = 2;

    this.startMinutesRef = React.createRef();
    this.startSecondsRef = React.createRef();
    this.startMilisecondsRef = React.createRef();
    this.endMinutesRef = React.createRef();
    this.endSecondsRef = React.createRef();
    this.endMilisecondsRef = React.createRef();
  }

  countShade = (color: string): string => {
    return color + "90";
  };

  setMomentColorButtonStyle = (backgroundColor: string): CSS.Properties => {
    return { backgroundColor: backgroundColor };
  };

  handleColorButtonClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const colorData: string | null = event.currentTarget.getAttribute(
      "data-color"
    );
    const color: MomentColor =
      colorData !== null ? (colorData as MomentColor) : this.defaultColor;
    this.props.onColorChange(color);
  };

  handleReactionClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const reactionData: string | null = event.currentTarget.getAttribute(
      "data-reaction"
    );
    const reaction: MomentReaction =
      reactionData !== null
        ? (reactionData as MomentReaction)
        : this.defaultReaction;
    this.props.onReactionChange(reaction);
  };

  handleSectionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const sectionData: string | null = event.currentTarget.getAttribute(
      "data-section"
    );
    const section: MomentSection =
      sectionData !== null
        ? (parseInt(sectionData) as MomentSection)
        : this.defaultSection;
    this.props.onSectionChange(section);
  };

  handleStartChangeTime = (event: React.KeyboardEvent): void => {
    const { startMinutesRef, startSecondsRef, startMilisecondsRef } = this;

    const m: number =
      startMinutesRef.current !== null
        ? parseInt(startMinutesRef.current.value)
        : 0;
    const s: number =
      startSecondsRef.current !== null
        ? parseInt(startSecondsRef.current.value)
        : 0;
    const ms: number =
      startMilisecondsRef.current !== null
        ? parseInt(startMilisecondsRef.current.value)
        : 0;

    this.props.newCurrentTime(convertToSeconds(m, s, ms));
    this.props.newRecordingTimeStart(convertToSeconds(m, s, ms));
  };

  handleEndChangeTime = (event: React.KeyboardEvent): void => {
    const { endMinutesRef, endSecondsRef, endMilisecondsRef } = this;

    const m: number =
      endMinutesRef.current !== null
        ? parseInt(endMinutesRef.current.value)
        : 0;
    const s: number =
      endSecondsRef.current !== null
        ? parseInt(endSecondsRef.current.value)
        : 0;
    const ms: number =
      endMilisecondsRef.current !== null
        ? parseInt(endMilisecondsRef.current.value)
        : 0;

    this.props.newCurrentTime(convertToSeconds(m, s, ms));
    this.props.newRecordingTimeEnd(convertToSeconds(m, s, ms));
  };

  getTimeValueInputArgs = (isStart: boolean): timeValueInputProps => {
    const { currentTime, selectedTimeStart, selectedTimeEnd } = this.props;
    const recordingValueArg: number = isStart ? selectedTimeStart : currentTime;

    const editingValueArg: number = isStart
      ? selectedTimeStart
      : selectedTimeEnd;

    const handleTypeArg: (event: React.KeyboardEvent) => void = isStart
      ? this.handleStartChangeTime
      : this.handleEndChangeTime;

    return {
      recordingValueArg: recordingValueArg,
      editingValueArg: editingValueArg,
      handleTypeArg: handleTypeArg
    };
  };

  mmInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    const refTypeArg: React.RefObject<HTMLInputElement> = isStart
      ? this.startMinutesRef
      : this.endMinutesRef;

    input =
      this.props.mode === RatingEditorMode.RECORDING ? (
        <input
          type="number"
          value={
            convertToMMSSMS(
              this.getTimeValueInputArgs(isStart).recordingValueArg
            ).m
          }
          min="0"
          max="60"
          className="time-value-input readonly"
          readOnly
        />
      ) : (
        <input
          type="number"
          defaultValue={
            convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg)
              .m
          }
          placeholder="00"
          ref={refTypeArg}
          min="0"
          max="60"
          className="time-value-input"
          onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
        />
      );

    return input;
  };

  ssInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    const refTypeArg: React.RefObject<HTMLInputElement> = isStart
      ? this.startSecondsRef
      : this.endSecondsRef;

    input =
      this.props.mode === RatingEditorMode.RECORDING ? (
        <input
          type="number"
          value={
            convertToMMSSMS(
              this.getTimeValueInputArgs(isStart).recordingValueArg
            ).s
          }
          min="0"
          max="60"
          className="time-value-input readonly"
          readOnly
        />
      ) : (
        <input
          type="number"
          defaultValue={
            convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg)
              .s
          }
          placeholder="00"
          ref={refTypeArg}
          min="0"
          max="60"
          className="time-value-input"
          onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
        />
      );

    return input;
  };

  msInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    const refTypeArg: React.RefObject<HTMLInputElement> = isStart
      ? this.startMilisecondsRef
      : this.endMilisecondsRef;

    input =
      this.props.mode === RatingEditorMode.RECORDING ? (
        <input
          type="number"
          value={
            convertToMMSSMS(
              this.getTimeValueInputArgs(isStart).recordingValueArg
            ).ms
          }
          min="0"
          max="1000"
          className="time-value-input miliseconds readonly"
          readOnly
        />
      ) : (
        <input
          type="number"
          defaultValue={
            convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg)
              .ms
          }
          placeholder="00"
          ref={refTypeArg}
          min="0"
          max="1000"
          className="time-value-input miliseconds"
          onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
        />
      );

    return input;
  };

  createMomentReactions = (): Array<JSX.Element> => {
    let reactions: Array<JSX.Element> = [];

    for (const reaction of reactionsData) {
      const reactionClass: string =
        reaction.name === this.props.newMoment.reaction
          ? "moment-reaction active"
          : "moment-reaction";

      reactions.push(
        <span key={reaction.name} className={reactionClass}>
          <img
            className="reaction-img"
            src={reaction.path}
            onClick={this.handleReactionClick}
            data-reaction={reaction.name}
            alt={reaction.name}
          />
        </span>
      );
    }
    return reactions;
  };

  createMomentColorButtons = (): Array<JSX.Element> => {
    let buttons: Array<JSX.Element> = [];

    for (const color of colorsData) {
      const buttonClass: string =
        color.color === this.props.newMoment.color
          ? "color-button active"
          : "color-button";

      buttons.push(
        <input
          key={color.color}
          type="button"
          className={buttonClass}
          data-color={color.color}
          style={this.setMomentColorButtonStyle(color.color)}
          onClick={this.handleColorButtonClick}
        />
      );
    }
    return buttons;
  };

  createSectionButtons = (): Array<JSX.Element> => {
    let sectionButtons: Array<JSX.Element> = [];

    for (let section = 0; section <= 4; ++section) {
      const sectionButtonClass: string =
        section == this.props.newMoment.section
          ? "section-button active"
          : "section-button";

      sectionButtons.push(
        <div
          key={section}
          className={sectionButtonClass}
          data-section={section}
          onClick={this.handleSectionClick}
        >
          <span>{section + 1}</span>
        </div>
      );
    }
    return sectionButtons;
  };

  handleMomentNameInputKeyUp = (
    event: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    this.props.onNameChange(event.currentTarget.value);
  };

  handleMomentDescriptionAreaKeyUp = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    this.props.onDescriptionChange(event.currentTarget.value);
  };

  render() {
    const { currentTime, newMoment } = this.props;

    convertToMMSSMS(currentTime);
    return (
      <div
        className="moment-editor-container"
        style={{ backgroundColor: this.countShade(newMoment.color) }}
      >
        <div className="moment-editor left">
          <div className="moment-name-input-container">
            <input
              type="text"
              className="moment-name-input"
              placeholder="moment-name"
              onKeyUp={this.handleMomentNameInputKeyUp}
            />
          </div>
          <div className="moment-description-container">
            <textarea
              className="moment-description-input"
              placeholder="Add description of your moment... "
              onKeyUp={this.handleMomentDescriptionAreaKeyUp}
            />
          </div>
          <div className="moment-colors-container">
            <div className="moment-colors">
              {this.createMomentColorButtons()}
            </div>
          </div>
          <div className="moment-reactions-container">
            {this.createMomentReactions()}
          </div>
        </div>
        <div className="moment-editor-divider-container">
          <div className="moment-editor-divider" />
        </div>
        <div className="moment-editor right">
          <div className="moment-time-wrapper">
            <div className="moment-time-container">
              <div className="time-value">
                {this.mmInput(true)}
                <span>:</span>
                {this.ssInput(true)}
                <span>:</span>
                {this.msInput(true)}
              </div>
              <div className="time-divider" />
              <div className="time-name-container">
                <span>start</span>
              </div>
            </div>
            <div className="moment-time-container">
              <div className="time-value">
                {this.mmInput(false)}
                <span>:</span>
                {this.ssInput(false)}
                <span>:</span>
                {this.msInput(false)}
              </div>
              <div className="time-divider" />
              <div className="time-name-container">
                <span>end</span>
              </div>
            </div>
          </div>
          <div className="moment-section-selector-wrapper">
            <div className="moment-section-selector">
              <div className="selector-title">
                <span>section</span>
              </div>
              <div className="section-buttons-container">
                {this.createSectionButtons()}
              </div>
              <div className="section-selector-final-button">
                <i className="icon-right-open" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const MomentEditorContainer: ConnectedComponent<
  typeof MomentEditor,
  any
> = connect(mapStateToProps, mapDispatchToProps)(MomentEditor);

export default MomentEditorContainer;
