import React from "react";

import "./track-waver.scss";
import { number } from "prop-types";

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
  onChangeTime: Function; // (index: number) => void;
};

const svgHeight: number = 150;

class TrackWaverStick extends React.Component<TrackWaverStickProps> {
  constructor(props: TrackWaverStickProps) {
    super(props);
  }

  handleClick() {
    this.props.onChangeTime(this.props.index);
  }

  render() {
    let fill = this.props.isActive ? "url(#active)" : "#5e5e5e";
    let x = this.props.index * 4;
    let y = (svgHeight - this.props.value) / 2;
  return (
    <path
      data-name={`stick-${this.props.index}`}
      transform={`translate(${x}, ${y})`}
      fill={`${fill}`}
      d={`M0 0h2.5v${this.props.value}H0z`}
      onClick={() => this.handleClick()}
    ></path>
  );
  }
}

class TrackWaver extends React.Component<TrackWaverProps> {
  state = {
    wave: this.props.wave,
    isPlaying: this.props.isPlaying,
    currentTime: this.props.currentTime,
    duration: this.props.duration,
  };  
  activeArea: number;

  constructor(props: TrackWaverProps) {
    super(props);
    this.activeArea = 0;
  }

  componentDidMount() {
   
  }
  
  handleChangeTime = (index: number) => {
    this.setState({
      currentTime: (this.state.duration / 200) * index
    });

  }

  getRandomHeight() {
    let min = Math.ceil(30);
    let max = Math.floor(90);
    return Math.floor(Math.random() * (max - min)) + min;
  }

 

  createSticks = () => {
    let sticks = [];
    this.activeArea = (this.state.currentTime / this.state.duration) * 200;

    for (let i = 0; i < 200; ++i) {
      let isActive = i < this.activeArea ? true : false;
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.getRandomHeight()}
          isActive={isActive}
          onChangeTime={this.handleChangeTime}
        />
      );
    }
    return sticks;
  };

  render() {
    return (
      <div className="track-waver">
        {this.state.currentTime} / {this.state.duration} ->
        {this.activeArea}
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
