import React, { RefObject } from "react";

import "./track-waver.scss";
import { Dispatch } from "redux";
import { AppState } from "../../../core/state/store";

import * as tasks from "../../../core/state/ducks/tasks";
import { ConnectedComponent, connect } from "react-redux";
import { Seconds } from "../../../core/shared";

const mapStateToProps = (state: AppState): TrackWaverProps | any => ({
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  wave: state.viewedTrack.wave,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  soundcloudDuration: state.viewedTrack.duration
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): TrackWaverProps | any => ({
  onTransferTrackToPlayer: () => {
    dispatch(tasks.trackOperations.transferViewedTrackToPlayer(true));
  },
  onChangeTime: (newTime: number) => {
    dispatch(tasks.trackActions.setAudioNewTime(newTime));
  }
});

type TrackWaverProps = {
  isSetInPlayer: boolean;
  wave: Array<number>;
  currentTime: number;
  duration: Seconds;
  soundcloudDuration: Seconds;
  onTransferTrackToPlayer: () => void;
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
    const { isActive, index, value } = this.props;

    const fill: string = isActive ? "url(#active)" : "#5e5e5e";
    const x: number = index * stickSpace;
    const y: number = (svgHeight - value) / 2;
    return (
      <g transform={`translate(${x}, 0)`}>
        <path fill={`${fill}`} d={`M0 0h4v${value}H0z`} />
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

  createSticks = (): Array<JSX.Element> => {
    const { isSetInPlayer, currentTime, duration, wave } = this.props;
    let sticks: Array<JSX.Element> = [];
    const activeArea: number =
      isSetInPlayer && duration
        ? Math.ceil((currentTime / duration) * this.sticksCount)
        : 0;

    for (let i = 0; i < activeArea; ++i) {
      sticks.push(
        <TrackWaverStick key={i} index={i} value={wave[i]} isActive={true} />
      );
    }
    for (let i = activeArea; i < this.sticksCount; ++i) {
      sticks.push(
        <TrackWaverStick key={i} index={i} value={wave[i]} isActive={false} />
      );
    }
    return sticks;
  };

  handleClick = (event: React.MouseEvent<SVGElement>): void => {
    const { isSetInPlayer, duration } = this.props;
    if (!isSetInPlayer) {
      this.props.onTransferTrackToPlayer();
    }
    const offsetX: number = event.nativeEvent.offsetX;
    this.props.onChangeTime((duration / svgWidth) * offsetX);
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
          onClick={this.handleClick}
          onMouseMove={this.handleMouseMove}
        >
          <defs>
            <linearGradient id="active" x2="1" y2="1">
              <stop offset="0%" stopColor="#fd7a2c" />
              <stop offset="80%" stopColor="#ba3a65" />
              <stop offset="100%" stopColor="#ba3a65" />
            </linearGradient>
          </defs>
          {this.createSticks()}
        </svg>
      </div>
    );
  }
}

const TrackWaverContainer: ConnectedComponent<typeof TrackWaver, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackWaver);

export default TrackWaverContainer;
