import React from "react";
import "./moment-editor.scss";
import CSS from "csstype";
import Emojis from "../../../../src/assets/png/emojis/1f44d.png";
import { stringify } from "querystring";
import { withRouter } from "react-router-dom";


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

  colorsArr: Array<string> = [
    "#5D238A",
    "#283DC3",
    "#38ADAE",
    "#F85765",
    "#F94922",
    "#D12E71",
    "#BC209B",
    "#6A4BA2"
  ];

  countShade = (color: string): string => {
    let rgb: Array<string> = color.substring(4, color.length-1)
        .replace(/ /g, '')
        .split(',');
    let shadeFactor: number = 0.4;
    let newR: number = parseInt(rgb[0]) * (1 - shadeFactor);
    let newG: number = parseInt(rgb[1]) * (1 - shadeFactor);
    let newB: number = parseInt(rgb[2]) * (1 - shadeFactor);

    return "rgb(" + 
      String(newR) + ", " + 
      String(newG) + ", " +
      String(newB) + 
      ")";
  }

  setMomentColorButtonStyle = (backgroundColor: string): CSS.Properties => {
    return { backgroundColor: backgroundColor };
  };

  handleColorButtonClick = (event: React.MouseEvent<HTMLSpanElement>) => {
    let newMainColor = this.countShade(event.currentTarget.style.backgroundColor);
    console.log(newMainColor);
  
    this.setState({
      mainColor: newMainColor
    });

  };

  createMomentColorButtons = (): Array<JSX.Element> => {
    let buttonsArr: Array<JSX.Element> = [];

    for (let i = 0; i < this.colorsArr.length; ++i) {
      buttonsArr.push(
        <input
          type="button"
          className="color-button"
          id="off"
          style={this.setMomentColorButtonStyle(this.colorsArr[i])}
          onClick={this.handleColorButtonClick}
        />
      );
    }
    return buttonsArr;
  };

  render() {
    return (
      <div className="moment-editor-container" style={{backgroundColor: this.state.mainColor}}>
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
