import React, { RefObject } from "react";

import "./track-waver.scss";

type TrackWaverProps = {
  wave: Array<number>;
  currentTime: number;
  duration: number;
  onChangeTime: (newTime: number) => void;
};

type TrackWaverStickProps = {
  index: number;
  value: number;
  isActive: boolean;
};

const svgWidth: number = 800;
const svgHeight: number = 150;
const stickSpace: number = 5;

class TrackWaverStick extends React.Component<TrackWaverStickProps> {
  constructor(props: TrackWaverStickProps) {
    super(props);
  }

  render() {
    let fill = this.props.isActive ? "url(#active)" : "#5e5e5e";
    let x = this.props.index * stickSpace;
    let y = (svgHeight - this.props.value) / 2;
    return (
      <g transform={`translate(${x}, 0)`}>
        <path
          data-name={`stick-${this.props.index}`}
          fill={`${fill}`}
          d={`M0 0h4v${this.props.value}H0z`}
        ></path>
      </g>
    );
  }
}

class TrackWaver extends React.Component<TrackWaverProps> {
  sticksCount: number;
  areaRef: RefObject<any>;

  constructor(props: TrackWaverProps) {
    super(props);
    this.sticksCount = svgWidth / stickSpace;
    this.areaRef = React.createRef();
  }

  handleChangeTime = (index: number): void => {
    this.props.onChangeTime((this.props.duration / this.sticksCount) * index);
  };

  createSticks = (): Array<JSX.Element> | void => {
    let sticks: Array<JSX.Element> = [];
    let activeArea: number;
    if (this.props.duration)
      activeArea = Math.ceil(
        (this.props.currentTime / this.props.duration) * this.sticksCount
      );
    else activeArea = 0;

    for (let i = 0; i < activeArea; ++i) {
      sticks.push(
        <TrackWaverStick index={i} value={this.props.wave[i]} isActive={true} />
      );
    }
    for (let i = activeArea; i < this.sticksCount; ++i) {
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.props.wave[i]}
          isActive={false}
        />
      );
    }
    return sticks;
  };

  handleClick = (event: React.MouseEvent<SVGElement>): void => {
    const offsetX: number = event.nativeEvent.offsetX;
    this.props.onChangeTime((this.props.duration / svgWidth) * offsetX);
  };

  handleMouseMove = (event: React.MouseEvent<SVGElement>): void => {
    const offsetX: number = event.nativeEvent.offsetX;
  };

  render() {
    return (
      <div className="track-waver">
        <svg
          data-name="track-waver-svg"
          width="100%"
          height={svgHeight}
          {...this.props}
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}
        >
          <defs>
            <linearGradient id="active" x2="1" y2="1">
              <stop offset="0%" stop-color="#fd7a2c" />
              <stop offset="80%" stop-color="#ba3a65" />
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
