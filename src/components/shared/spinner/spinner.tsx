import React from "react";
import "./spinner.scss";
import { random } from "../../../utils";

type SpinnerComponentProps = {
  progress: number;
};

type SpinnerComponentState = {};

class SpinnerComponent extends React.Component<
  SpinnerComponentProps,
  SpinnerComponentState
> {
  spacing: number = 6;
  randomHeights: Array<number> = [];
  constructor(props: SpinnerComponentProps) {
    super(props);
    this.randomHeights = this.getRandomHeights();
  }

  getRandomHeights(): Array<number> {
    let heights: Array<number> = [];
    for (let i = 0; i < 360 / this.spacing; ++i) {
      heights.push(random(10, 16));
    }
    return heights;
  }

  render() {
    const progress: number =
      this.props.progress <= 100 ? this.props.progress : 100;
    const area: number = ((progress / 100) * 360) / this.spacing;
    let degs: Array<number> = [];
    for (let i = 0; i <= area; ++i) {
      degs.push(i * this.spacing);
    }

    return (
      <div className="spinner">
        <div className="sticks">
          {degs.map((deg, i) => (
            <div
              className="stick-box"
              style={{ transform: `rotate(${deg}deg)` }}
            >
              <div
                className="stick"
                style={{
                  top: `${this.randomHeights[i]}%`
                }}
              >
                <div className="fulfillment"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="box">
          <div className="inner">
            <div className="note-box">
              <i className="icon-note"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SpinnerComponent;
