import React from "react";

import "./track-waver.scss";

type TrackWaverProps = {
  wave: Array<number>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

type TrackWaverStickProps = {
  index: number;
  value: number;
  isActive: boolean;
  onChangeTime: (index: number) => void;
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
    let x = this.props.index * 5.5;
    let y = (svgHeight - this.props.value) / 2;
    return (
      <g transform={`translate(${x}, 0)`}>
        <path
          data-name={`stick-${this.props.index}`}
          fill={`${fill}`}
          d={`M0 0h4v${this.props.value}H0z`}
          onClick={this.handleClick}
        ></path>
      </g>
    );
  }
}

class TrackWaver extends React.Component<TrackWaverProps> {
  state = {
    wave: this.props.wave,
    isPlaying: this.props.isPlaying,
    currentTime: this.props.currentTime,
    duration: this.props.duration
  };
  sticksCount: number;
  activeArea: number;

  constructor(props: TrackWaverProps) {
    super(props);
    this.activeArea = 0;
    this.sticksCount = 140;
  }

  componentDidUpdate(oldProps: TrackWaverProps) {
    const newProps: TrackWaverProps = this.props;
    if (newProps.wave !== oldProps.wave) {
      this.setState({
        wave: this.props.wave
      });
    }
  }

  handleChangeTime = (index: number) => {
    this.setState({
      currentTime: (this.state.duration / this.sticksCount) * index
    });
  };

  createSticks = () => {
    let sticks = [];
    this.activeArea = Math.ceil(
      (this.state.currentTime / this.state.duration) * this.sticksCount
    );

    for (let i = 0; i < this.activeArea; ++i) {
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.state.wave[i]}
          isActive={true}
          onChangeTime={this.handleChangeTime}
        />
      );
    }
    for (let i = this.activeArea; i < this.sticksCount; ++i) {
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.state.wave[i]}
          isActive={false}
          onChangeTime={this.handleChangeTime}
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
