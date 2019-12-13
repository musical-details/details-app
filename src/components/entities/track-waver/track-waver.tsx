import React, { ReactEventHandler } from "react";

import "./track-waver.scss";

type TrackWaverProps = {
  wave: [];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

type TrackWaverStickProps = {
  index: number;
  value: number;
  isActive: boolean;
  onChangeTime: Function;
};

const svgHeight: number = 150;

class TrackWaverStick extends React.Component<TrackWaverStickProps> {
  constructor(props: TrackWaverStickProps) {
    super(props);
  }

  handleClick = (event: React.MouseEvent<SVGPathElement>) => {
    this.props.onChangeTime(this.props.index);
  };

  render() {
    let fill = this.props.isActive ? "url(#active)" : "#5e5e5e";
    let x = this.props.index * 4;
    let y = (svgHeight - this.props.value) / 2;

    return (
      <path
        data-name="stick"
        transform={`translate(${x}, ${y})`}
        fill={`${fill}`}
        d={`M0 0h2.5v${this.props.value}H0z`}
        onClick={this.handleClick}
      ></path>
    );
  }
}

class TrackWaver extends React.Component<TrackWaverProps> {
  myInput: React.RefObject<any>;

  constructor(props: TrackWaverProps) {
    super(props);
    this.myInput = React.createRef();
  }

  componentDidMount() {
    console.log(this.myInput);
  }

  getRandomHeight() {
    let min = Math.ceil(30);
    let max = Math.floor(90);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  handleTimeChange(event: any) {
    alert(event);
    console.log(event);
  }

  createSticks = () => {
    let sticks = [];

    for (let i = 0; i < 200; ++i) {
      let isActive = i < 100 ? true : false;
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.getRandomHeight()}
          isActive={isActive}
          onChangeTime={this.handleTimeChange}
        />
      );
    }
    return sticks;
  };

  render() {
    return (
      <div className="track-waver">
        <svg
          data-name="track-waver-svg"
          width="100%"
          height={svgHeight}
          {...this.props}
        >
          <defs>
            <linearGradient id="active" x2="1" y2="1">
              <stop offset="0%" stop-color="#ff7b2b" />
              <stop offset="85%" stop-color="#ba3a65" />
              <stop offset="100%" stop-color="#ba3a65" />
            </linearGradient>
          </defs>
          {this.createSticks()}
        </svg>
      </div>
    );
  }
}

export default TrackWaver;
