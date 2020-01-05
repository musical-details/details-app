import React from "react";
import "./moment-editor.scss";
import CSS from "csstype";

import momentColorsJSON from "../../../assets/data/moment-colors.json"
import momentReactionsJSON from "../../../assets/data/moment-reactions.json"

import { convertToMMSSMS } from "../../../utils/index";
import { convertToSeconds } from "../../../utils/index";
import { stringify } from "querystring";

type MomentEditorState = {
  mainColor: string,
  mainReactionName: string,
  section: number
  isRecorded: boolean
}

type MomentEditorProps = {
  currentTime: number
  newCurrentTime: (time: number) => void
}

class MomentEditor extends React.Component<MomentEditorProps> {

  minutesRef: React.RefObject<HTMLInputElement>;
  secondsRef: React.RefObject<HTMLInputElement>;
  milisecondsRef: React.RefObject<HTMLInputElement>;

  state: MomentEditorState = {
    mainColor: '#222',
    mainReactionName: '',
    section: 0,
    isRecorded: false
  }

  constructor(props: MomentEditorProps) {
    super(props);

    this.minutesRef = React.createRef();
    this.secondsRef = React.createRef();
    this.milisecondsRef = React.createRef();
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

  handleChangeTime = (event: React.KeyboardEvent): void => {
    const { minutesRef, secondsRef, milisecondsRef } = this;

    const m: number  = parseInt((minutesRef.current as HTMLInputElement).value);
    const s: number  = parseInt((secondsRef.current as HTMLInputElement).value);
    const ms: number = parseInt((milisecondsRef.current as HTMLInputElement).value);

    console.log(m, s, ms)
    //console.log(convertToSeconds(m, s, ms))
    
   // this.props.newCurrentTime(convertToSeconds(m, s, ms))
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

  mmInput = (): JSX.Element => {
    return(
      <input 
        type="number" 
        defaultValue={convertToMMSSMS(this.props.currentTime).m} 
        placeholder="00"
        ref={this.minutesRef}
        min="0" max="60" 
        className="time-value-input" 
        onKeyUp={this.handleChangeTime}
        
      />
    )
  }

  ssInput = (): JSX.Element => {
    return(
      <input 
        type="number" 
        value={convertToMMSSMS(this.props.currentTime).s} 
        placeholder="00"
        ref={this.secondsRef}
        min="0" max="60" 
        className="time-value-input"
        onKeyUp={this.handleChangeTime}
      />
    )
  }

  msInput = (): JSX.Element => {
    return(
      <input 
        type="number" 
        value={convertToMMSSMS(this.props.currentTime).ms} 
        placeholder="00"
        ref={this.milisecondsRef}
        min="0" max="1000" 
        className="time-value-input miliseconds"
        onKeyUp={this.handleChangeTime}
      />
    )
  }


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
                {this.mmInput()}
                <span>:</span>
                {this.ssInput()}
                <span>:</span>
                {this.msInput()}
              </div>
              <div className="time-divider"></div>
              <div className="time-name-container">
                <span>start</span>
              </div>
            </div>
            <div className="moment-time-container">
              <div className="time-value">
                {this.mmInput()}
                <span>:</span>
                {this.ssInput()}
                <span>:</span>
                {this.msInput()}
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

export default MomentEditor;
