import React, { Dispatch } from "react";
import { connect, ConnectedComponent } from "react-redux";
import CSS from "csstype";

import "./moment-editor.scss";

import { AppState } from "../../../core/state/store";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";
import * as tasks from "../../../core/state/ducks/tasks";

import momentColorsJSON from "../../../assets/data/moment-colors.json";
import momentReactionsJSON from "../../../assets/data/moment-reactions.json";

import { convertToMMSSMS, convertToSeconds } from "../../../utils/index";

const mapStateToProps = (state: AppState): MomentEditorProps | any => ({
  currentTime: state.track.currentTime,
  mode: state.ratingEditor.mode,
  selectedTimeStart: state.ratingEditor.selectedTime.start,
  selectedTimeEnd: state.ratingEditor.selectedTime.end
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
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
  newCurrentTime: (time: number) => void;
  newRecordingTimeStart: (time: number) => void;
  newRecordingTimeEnd: (time: number) => void;
};

type MomentEditorState = {
  selectedColor: string;
  selectedReaction: string;
  section: number;
};

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

  state: MomentEditorState = {
    selectedColor: "#222",
    selectedReaction: "",
    section: 0
  };

  constructor(props: MomentEditorProps) {
    super(props);
    this.defaultColor = "#222";
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
    const selectedColor: string =
      event.currentTarget.getAttribute("data-color") !== null
        ? (event.currentTarget.getAttribute("data-color") as string)
        : this.defaultColor;
    this.setState({
      selectedColor: selectedColor
    });
  };

  handleReactionClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    const selectedReaction: string =
      event.currentTarget.getAttribute("alt") !== null
        ? (event.currentTarget.getAttribute("alt") as string)
        : "";
    this.setState({
      selectedReaction: selectedReaction
    });
  };

  handleSectionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    const el: Element | null = event.currentTarget.children.item(0);
    const section: string = el !== null ? el.innerHTML : "";
    this.setState({
      section: parseInt(section)
    });
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
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
      ? (refTypeArg = this.startMinutesRef)
      : (refTypeArg = this.endMinutesRef);

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
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
      ? (refTypeArg = this.startSecondsRef)
      : (refTypeArg = this.endSecondsRef);

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
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
      ? (refTypeArg = this.startMilisecondsRef)
      : (refTypeArg = this.endMilisecondsRef);

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
    let reactionsArr: Array<JSX.Element> = [];

    for (let i = 0; i < momentReactionsJSON.reactions.length; ++i) {
      let reactionClass: string;
      momentReactionsJSON.reactions[i].name == this.state.selectedReaction
        ? (reactionClass = "moment-reaction active")
        : (reactionClass = "moment-reaction");

      reactionsArr.push(
        <span className={reactionClass}>
          <img
            className="reaction-img"
            src={momentReactionsJSON.reactions[i].path}
            onClick={this.handleReactionClick}
            alt={momentReactionsJSON.reactions[i].name}
          />
        </span>
      );
    }
    return reactionsArr;
  };

  createMomentColorButtons = (): Array<JSX.Element> => {
    let buttonsArr: Array<JSX.Element> = [];

    for (let i = 0; i < momentColorsJSON.colors.length; ++i) {
      let buttonClass: string;
      momentColorsJSON.colors[i].color == this.state.selectedColor
        ? (buttonClass = "color-button active")
        : (buttonClass = "color-button");

      buttonsArr.push(
        <input
          type="button"
          className={buttonClass}
          data-color={momentColorsJSON.colors[i].color}
          style={this.setMomentColorButtonStyle(
            momentColorsJSON.colors[i].color
          )}
          onClick={this.handleColorButtonClick}
        />
      );
    }
    return buttonsArr;
  };

  createSectionButtons = (): Array<JSX.Element> => {
    let sectionButtonsArr: Array<JSX.Element> = [];

    for (let i = 1; i < 6; ++i) {
      let sectionButtonClass: string;
      i == this.state.section
        ? (sectionButtonClass = "section-button active")
        : (sectionButtonClass = "section-button");

      sectionButtonsArr.push(
        <div className={sectionButtonClass} onClick={this.handleSectionClick}>
          <span>{i}</span>
        </div>
      );
    }
    return sectionButtonsArr;
  };

  render() {
    convertToMMSSMS(this.props.currentTime);
    return (
      <div
        className="moment-editor-container"
        style={{ backgroundColor: this.countShade(this.state.selectedColor) }}
      >
        <div className="moment-editor left">
          <div className="moment-name-input-container">
            <input
              type="text"
              className="moment-name-input"
              placeholder="moment-name"
            />
          </div>
          <div className="moment-description-container">
            <textarea
              className="moment-description-input"
              placeholder="Add description of your moment... "
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
          <div className="moment-editor-divider"></div>
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
              <div className="time-divider"></div>
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
              <div className="time-divider"></div>
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
                <i className="icon-right-open"></i>
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
