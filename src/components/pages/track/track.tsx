import React, { Dispatch, ComponentClass } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router-dom";

import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";
import Timeline from "../../entities/timeline/Timeline";

import { SoundCloud, API_KEY } from "../../../core/soundcloud";
import CSS from "csstype";

import "./track.scss";

import { AppState } from "../../../core/state/store";
import actions from "../../../core/state/ducks/track/track.actions";
import trackOperations from "../../../core/state/ducks/track/track.operations";
import viewedTrackOperations from "../../../core/state/ducks/viewed-track/viewed-track.operations";
import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import trackActions from "../../../core/state/ducks/track/track.actions";

type TrackProps = {
  trackId: number;
  isSetInPlayer: boolean;
  cover: string;
  author: string;
  title: string;
  audio: string;
  wave: Array<number>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  match?: any;
  fetchTrack: (trackId: number) => void;
  transferTrackToPlayer: (data: {
    trackId: number;
    cover: string;
    author: string;
    title: string;
  }) => void;
  toogleAudioStatus: () => void;
  changeTime: (newTime: number) => void;
  changeVolume: (newVolume: number) => void;
};

type TrackState = {
  player: any;
  selectedRating: any;
};

type TrackPlayerState = {
  audio: HTMLAudioElement;
  wave: Array<number>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
};

type UserState = {
  id_user: number;
  nickname: string;
  avatar: string;
};

type MomentState = {
  name: string;
  description: string;
  color: string;
  start: number;
  end: number;
};

class TrackComponent extends React.Component<TrackProps, TrackState> {
  audio: HTMLAudioElement;
  state: TrackState | any = {
    player: {
      wave: []
    },

    selectedRating: {
      id_rating: 1,
      user: {
        id_user: 1,
        nickname: "daddyaddy",
        avatar: ""
      },
      moments: []
    }
  };

  constructor(props: TrackProps) {
    super(props);
    this.audio = new Audio();
  }

  async componentDidMount() {
    const { trackId } = this.props.match.params;
    await this.props.fetchTrack(trackId);
    this.randomWave();
  }

  handleChangeTime = (newTime: number): void => {
    if (!this.props.isSetInPlayer) {
      this.props.transferTrackToPlayer({
        trackId: this.props.trackId,
        cover: this.props.cover,
        title: this.props.title,
        author: this.props.author
      });
    }

    this.props.changeTime(newTime);
  };

  handlePlayButtonClick = (isPlaying: boolean): void => {
    if (!this.props.isSetInPlayer) {
      this.props.transferTrackToPlayer({
        trackId: this.props.trackId,
        cover: this.props.cover,
        title: this.props.title,
        author: this.props.author
      });
    }

    this.props.toogleAudioStatus();
  };

  handleVolumeSliderDrag = (volume: number): void => {};

  handleVolumeSliderDragStop = (volume: number): void => {
    this.props.changeVolume(volume);
  };

  randomWave() {
    let wave: Array<number> = [];
    let min: number = Math.ceil(30);
    let max: number = Math.floor(90);

    for (let i = 0; i < 200; ++i) {
      wave.push(Math.floor(Math.random() * (max - min)) + min);
    }

    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: { ...prevState.player, wave: wave }
    }));
  }

  render() {
    return (
      <div>
        <div className="track-info-wrapper">
          <TrackInfo
            cover={this.props.cover}
            author={this.props.author}
            title={this.props.title}
            volume={this.props.volume}
            isPlaying={this.props.isSetInPlayer && this.props.isPlaying}
            onPlayButtonClick={this.handlePlayButtonClick}
            onVolumeSliderDrag={this.handleVolumeSliderDrag}
            onVolumeSliderDragStop={this.handleVolumeSliderDragStop}
          ></TrackInfo>
        </div>
        <div className="track-waver-wrapper">
          <TrackWaver
            wave={this.state.player.wave}
            currentTime={this.props.isSetInPlayer ? this.props.currentTime : 0}
            duration={this.props.isSetInPlayer ? this.props.duration : 1}
            onChangeTime={this.handleChangeTime}
          ></TrackWaver>
        </div>
        <div className="timeline-wrapper">
          <Timeline
            currentTime={this.props.isSetInPlayer ? this.props.currentTime : 0}
            duration={this.props.isSetInPlayer ? this.props.duration : 1}
            moment={this.state.selectedRating.moments}
          ></Timeline>
        </div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): TrackProps | any => ({
  trackId: state.viewedTrack.trackId,
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  cover: state.viewedTrack.cover,
  author: state.viewedTrack.author,
  title: state.viewedTrack.title,
  audio: state.track.audioSource,
  wave: [],
  isPlaying: state.track.isPlaying,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  volume: state.track.volume
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TrackProps | any => ({
  fetchTrack: async (trackId: number) => {
    await dispatch(viewedTrackOperations.fetchViewedTrack(trackId));
  },
  transferTrackToPlayer: (data: {
    trackId: number;
    cover: string;
    author: string;
    title: string;
  }) => {
    dispatch(
      trackOperations.transferTrackToPlayer({
        autoplay: true,
        trackId: data.trackId,
        cover: data.cover,
        author: data.author,
        title: data.title
      })
    );
    dispatch(viewedTrackActions.setInPlayer());
  },
  toogleAudioStatus: () => {
    dispatch(trackActions.toogleAudioStatus());
  },
  changeTime: (newTime: number) => {
    dispatch(trackActions.setAudioNewTime(newTime));
  },
  changeVolume: (newVolume: number) => {
    dispatch(trackActions.setAudioVolume(newVolume));
  }
});

const TrackContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackComponent) as ConnectedComponent<typeof TrackComponent, any>
);

export default TrackContainer;
