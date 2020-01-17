import React, { Dispatch }from "react";
import trackActions from "../../../core/state/ducks/track/track.actions";
import trackOperations from "../../../core/state/ducks/track/track.operations";
import { connect, ConnectedComponent } from "react-redux";
import "./moment-editor.scss";

import CSS from "csstype";
import { AppState } from "../../../core/state/store";

import momentColorsJSON from "../../../assets/data/moment-colors.json"
import momentReactionsJSON from "../../../assets/data/moment-reactions.json"

import { convertToMMSSMS } from "../../../utils/index";
import { convertToSeconds } from "../../../utils/index";

const mapStateToProps = (state: AppState): MomentEditorProps | any => ({
  currentTime: state.track.currentTime,
  isRecording: state.track.isRecording,
  recordedTimeStart: state.track.recordedTimeStart,
  recordedTimeEnd: state.track.recordedTimeEnd
})

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  newCurrentTime: (time: number) => {dispatch(trackActions.setAudioNewTime(time));},
  newRecordingTimeStart: (time: number) => {dispatch(trackActions.setAudioRecordingTimeStart(time));},
  newRecordingTimeEnd: (time: number) => {dispatch(trackActions.setAudioRecordingTimeEnd(time));}
})

type MomentEditorState = {
  mainColor: string;
  mainReactionName: string;
  section: number;
}

type MomentEditorProps = {
  currentTime: number;
  isRecording: boolean;
  recordedTimeStart: number;
  recordedTimeEnd: number;
  newCurrentTime: (time: number) => void;
  newRecordingTimeStart: (time: number) => void;
  newRecordingTimeEnd: (time: number) => void;
}

type timeValueInputProps = {
  recordingValueArg: number;
  editingValueArg: number;
  handleTypeArg: (event: React.KeyboardEvent) => void;
}

class MomentEditor extends React.Component<MomentEditorProps> {

  startMinutesRef: React.RefObject<HTMLInputElement>;
  startSecondsRef: React.RefObject<HTMLInputElement>;
  startMilisecondsRef: React.RefObject<HTMLInputElement>;
  endMinutesRef: React.RefObject<HTMLInputElement>;
  endSecondsRef: React.RefObject<HTMLInputElement>;
  endMilisecondsRef: React.RefObject<HTMLInputElement>;

  state: MomentEditorState = {
    mainColor: '#222',
    mainReactionName: '',
    section: 0,
  }

  constructor(props: MomentEditorProps) {
    super(props);

    this.startMinutesRef = React.createRef();
    this.startSecondsRef = React.createRef();
    this.startMilisecondsRef = React.createRef();
    this.endMinutesRef = React.createRef();
    this.endSecondsRef = React.createRef();
    this.endMilisecondsRef = React.createRef();
  }

  countShade = (color: string): string => {
    return color + '90';
  }

  setMomentColorButtonStyle = (backgroundColor: string): CSS.Properties => {
    return { backgroundColor: backgroundColor };
  };

  handleColorButtonClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    this.setState({
      mainColor: event.currentTarget.getAttribute('data-color')
    });
  };

  handleReactionClick = (event: React.MouseEvent<HTMLSpanElement>): void => {
    this.setState({
      mainReactionName: event.currentTarget.getAttribute('alt')
    });
  };

  handleSectionClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    this.setState({
      section: event.currentTarget.children.item(0)?.innerHTML
    });
  }

  handleStartChangeTime = (event: React.KeyboardEvent): void => {
    let m: number;
    let s: number;
    let ms: number;

    this.startMinutesRef.current?.value 
    ? m = parseInt(this.startMinutesRef.current.value) 
    : m = 0;
    this.startSecondsRef.current?.value 
    ? s = parseInt(this.startSecondsRef.current.value) 
    : s = 0;
    this.startMilisecondsRef.current?.value 
    ? ms = parseInt(this.startMilisecondsRef.current.value) 
    : ms = 0;

    this.props.newCurrentTime(convertToSeconds(m, s, ms));
    this.props.newRecordingTimeStart(convertToSeconds(m, s, ms));
  }

  handleEndChangeTime = (event: React.KeyboardEvent): void => {
    let m: number;
    let s: number;
    let ms: number;

    this.endMinutesRef.current?.value 
    ? m = parseInt(this.endMinutesRef.current.value) 
    : m = 0;
    this.endSecondsRef.current?.value 
    ? s = parseInt(this.endSecondsRef.current.value) 
    : s = 0;
    this.endMilisecondsRef.current?.value 
    ? ms = parseInt(this.endMilisecondsRef.current.value) 
    : ms = 0;

    this.props.newCurrentTime(convertToSeconds(m, s, ms));
    this.props.newRecordingTimeEnd(convertToSeconds(m, s, ms));
  }

  getTimeValueInputArgs = (isStart: boolean): timeValueInputProps => {
    let recordingValueArg: number;
    let editingValueArg: number;
    let handleTypeArg: (event: React.KeyboardEvent) => void;

    isStart 
    ? recordingValueArg = this.props.recordedTimeStart
    : recordingValueArg = this.props.currentTime

    isStart
    ? editingValueArg = this.props.recordedTimeStart
    : editingValueArg = this.props.recordedTimeEnd

    isStart
    ? handleTypeArg = this.handleStartChangeTime
    : handleTypeArg = this.handleEndChangeTime

    return {
      recordingValueArg: recordingValueArg,
      editingValueArg: editingValueArg,
      handleTypeArg: handleTypeArg,
    }
  }


  mmInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
    ? refTypeArg = this.startMinutesRef
    : refTypeArg = this.endMinutesRef

    this.props.isRecording
    ? input = <input 
                type="number" 
                value={convertToMMSSMS(this.getTimeValueInputArgs(isStart).recordingValueArg).m} 
                min="0" max="60" 
                className="time-value-input readonly" 
                readOnly
              />
    : input = <input 
                type="number" 
                defaultValue={convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg).m} 
                placeholder="00"
                ref={refTypeArg}
                min="0" max="60" 
                className="time-value-input" 
                onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
              />
    return input; 
  }

  ssInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
    ? refTypeArg = this.startSecondsRef
    : refTypeArg = this.endSecondsRef

    this.props.isRecording
    ? input = <input 
                type="number" 
                value={convertToMMSSMS(this.getTimeValueInputArgs(isStart).recordingValueArg).s} 
                min="0" max="60" 
                className="time-value-input readonly"
                readOnly
              />
    : input = <input 
                type="number" 
                defaultValue={convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg).s} 
                placeholder="00"
                ref={refTypeArg}
                min="0" max="60" 
                className="time-value-input"
                onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
              />
    return input;
  }

  msInput = (isStart: boolean): JSX.Element => {
    let input: JSX.Element;
    let refTypeArg: React.RefObject<HTMLInputElement>;

    isStart
    ? refTypeArg = this.startMilisecondsRef
    : refTypeArg = this.endMilisecondsRef

    this.props.isRecording
    ? input = <input 
                type="number" 
                value={convertToMMSSMS(this.getTimeValueInputArgs(isStart).recordingValueArg).ms} 
                min="0" max="1000" 
                className="time-value-input miliseconds readonly"
                readOnly
              />
    : input = <input 
                type="number" 
                defaultValue={convertToMMSSMS(this.getTimeValueInputArgs(isStart).editingValueArg).ms} 
                placeholder="00"
                ref={refTypeArg}
                min="0" max="1000" 
                className="time-value-input miliseconds"
                onKeyUp={this.getTimeValueInputArgs(isStart).handleTypeArg}
              />
    return input;
  }

  createMomentReactions = (): Array<JSX.Element> => {
    let reactionsArr: Array<JSX.Element> = [];

    for(let i = 0; i < momentReactionsJSON.reactions.length; ++i) {
      let reactionClass: string;
      momentReactionsJSON.reactions[i].name == this.state.mainReactionName 
      ? reactionClass = "moment-reaction active"
      : reactionClass = "moment-reaction"
      
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
      momentColorsJSON.colors[i].color == this.state.mainColor 
      ? buttonClass = "color-button active"
      : buttonClass = "color-button"
      
        buttonsArr.push(
        <input
          type="button"
          className={buttonClass}
          data-color={momentColorsJSON.colors[i].color}
          style={this.setMomentColorButtonStyle(momentColorsJSON.colors[i].color)}
          onClick={this.handleColorButtonClick}
        />
      );
    }
    return buttonsArr;
  };

  createSectionButtons = (): Array<JSX.Element> => {
    let sectionButtonsArr: Array<JSX.Element> = [];

    for( let i = 1; i < 6; ++i) {
      let sectionButtonClass: string;
      i == this.state.section
      ? sectionButtonClass = "section-button active"
      : sectionButtonClass = "section-button"

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
      <div className="moment-editor-container" style={{backgroundColor: this.countShade(this.state.mainColor)}}>
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

const MomentEditorContainer: ConnectedComponent<typeof MomentEditor, any> = connect(mapStateToProps, mapDispatchToProps)(MomentEditor);

export default MomentEditorContainer;
