import React from "react";
import "./moment-editor.scss";
import CSS from "csstype";
import momentColorsJSON from "../../../assets/data/moment-colors.json"


type MomentEditorState = {
  mainColor: string
}

class MomentEditor extends React.Component {

  state: MomentEditorState = {
    mainColor: '#222'
  }

  constructor(props: string) {
    super(props);
  }

  countShade = (color: string): string => {
    return color + '90';
  }

  setMomentColorButtonStyle = (backgroundColor: string): CSS.Properties => {
    return { backgroundColor: backgroundColor };
  };

  handleColorButtonClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    this.setState({
      mainColor: event.currentTarget.getAttribute('data-color')
    });
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

  render() {
    return (
      <div className="moment-editor-container" style={{backgroundColor: this.countShade(this.state.mainColor)}}>
        <div className="moment-editor-left">
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
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f62e.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f622.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f620.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f60d.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f606.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f44e.png")}
              />
            </span>
            <span className="moment-reaction">
              <img
                className="reaction-img"
                src={require("../../../../src/assets/png/emojis/1f44d.png")}
              />
            </span>
          </div>
        </div>
        <div className="moment-editor-divider-container">
          <div className="moment-editor-divider"></div>
        </div>
        <div className="moment-editor-right">

          <div className="moment-time-container">
            <div className="moment-time-start-container">
              <div className="time-start-value"></div>
              <div className="time-divider"></div>
              <div className="time-name">
                <p>start</p>
              </div>
            </div>
            <div className="moment-time-end-container">
              <div className="time-divider"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MomentEditor;
