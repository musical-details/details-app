import React from "react";

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
};

const svgHeight: number = 150;

const TrackWaverStick: React.FunctionComponent<TrackWaverStickProps> = ({
  index,
  value,
  isActive
}) => {
  let fill = isActive ? "url(#active)" : "#5e5e5e";
  return (
    <path
      data-name="stick"
      transform={`translate(${index * 4}, ${(svgHeight - value) / 2})`}
      fill={`${fill}`}
      d={`M0 0h2.5v${value}H0z`}
    ></path>
  );
};

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

  createSticks = () => {
    let sticks = [];

    for (let i = 0; i < 200; ++i) {
      let isActive = i < 100 ? true : false;
      sticks.push(
        <TrackWaverStick
          index={i}
          value={this.getRandomHeight()}
          isActive={isActive}
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
