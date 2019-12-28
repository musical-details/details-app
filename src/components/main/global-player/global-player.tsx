import React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { Dispatch } from "redux";
import CSS from "csstype";

import "./global-player.scss";
import { AppState } from "../../../core/state/store";
import trackOperations from "../../../core/state/ducks/track/track.operations";
import actions from "../../../core/state/ducks/track/track.actions";
import { NavLink } from "react-router-dom";

type GlobalPlayerProps = {
  trackId: number;
  autoplay: boolean;
  cover: string;
  author: string;
  title: string;
  audioSource: string;
  isPlaying: boolean;
  currentTime: number;
  newTime: number;
  duration: number;
  volume: number;
  fetchTrack: () => void;
  onAudioCanPlay: (duration: number) => void;
  onAudioPlay: () => void;
  onAudioPause: () => void;
  onAudioVolumeChange: (volume: number) => void;
  onAudioTimeUpdate: (currentTime: number) => void;
  onAudioTimeChange: (newTime: number) => void;
};

type GlobalPlayerState = any;

class GlobalPlayerComponent extends React.Component<
  GlobalPlayerProps,
  GlobalPlayerState
> {
  audio: HTMLAudioElement;

  constructor(props: GlobalPlayerProps) {
    super(props);
    this.audio = new Audio();
  }

  async componentDidMount() {
    await this.props.fetchTrack();
    await this.loadAudio();
  }

  componentDidUpdate(prevProps: GlobalPlayerProps) {
    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.props.isPlaying ? this.audio.play() : this.audio.pause();
    }
    if (prevProps.audioSource !== this.props.audioSource) {
      this.loadAudio();
    }
    if (prevProps.newTime !== this.props.newTime) {
      this.audio.currentTime = this.props.newTime;
      this.props.onAudioTimeUpdate(this.props.newTime);
    }
    if (prevProps.volume !== this.props.volume) {
      this.audio.volume = this.props.volume;
    }
  }

  componentWillUnmount() {
    this.audio.pause();
  }

  handleAudioCanPlay = () => {
    if (this.props.autoplay) this.props.onAudioPlay();
    this.props.onAudioCanPlay(this.audio.duration);
  };

  handleAudioPlay = () => {
    this.props.onAudioPlay();
  };

  handleAudioPause = () => {
    this.props.onAudioPause();
  };

  handleAudioTimeUpdate = () => {
    this.props.onAudioTimeUpdate(this.audio.currentTime);
  };

  handleAudioEnded = () => {};
  handleAudioWaiting = () => {};
  handleAudioError = () => {};

  async loadAudio() {
    this.audio.pause();
    this.audio = new Audio(this.props.audioSource);
    this.audio.load();
    this.audio.oncanplaythrough = this.handleAudioCanPlay;
    this.audio.onplay = this.handleAudioPlay;
    this.audio.ontimeupdate = this.handleAudioTimeUpdate;
    this.audio.onpause = this.handleAudioPause;
    this.audio.onended = this.handleAudioEnded;
    this.audio.onwaiting = this.handleAudioWaiting;
    this.audio.onerror = this.handleAudioError;
  }

  handlePlayButtonClick = (event: React.MouseEvent) => {
    this.props.isPlaying ? this.props.onAudioPause() : this.props.onAudioPlay();
  };

  handleBarAreaClick = (event: React.MouseEvent | any) => {
    const { offsetX, toElement } = event.nativeEvent;
    const newTime = (offsetX / toElement.offsetWidth) * this.props.duration;
    this.props.onAudioTimeChange(newTime);
  };

  render() {
    const { currentTime, duration, isPlaying } = this.props;

    let BarNotFillStyles: CSS.Properties = {
      width: 100 - (currentTime / duration) * 100 + "%"
    };

    let TrackCoverStyles: CSS.Properties = {
      backgroundImage: `url(${this.props.cover})`
    };

    let playButtonIcon: string = isPlaying ? "icon-pause" : "icon-play";

    return (
      <div className="global-player">
        <div>
          <div className="button" onClick={this.handlePlayButtonClick}>
            <i className={playButtonIcon}></i>
          </div>
          <div className="bar-box">
            <div className="bar-area" onClick={this.handleBarAreaClick}>
              <div className="bar">
                <div className="not-fill" style={BarNotFillStyles}></div>
              </div>
            </div>
          </div>
          <div className="volume-box">
            <i className="icon-volume"></i>
          </div>
          <NavLink to={`/track/${this.props.trackId}`}>
            <div className="track-box">
              <div className="left">
                <div className="track-cover" style={TrackCoverStyles}></div>
              </div>
              <div className="right">
                <div>
                  <div>
                    <span className="author">{this.props.author}</span>
                  </div>
                  <div>
                    <span className="title">{this.props.title}</span>
                  </div>
                </div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): GlobalPlayerProps | any => ({
  autoplay: state.track.autoplay,
  trackId: state.track.trackId,
  cover: state.track.cover,
  author: state.track.author,
  title: state.track.title,
  audioSource: state.track.audioSource,
  isPlaying: state.track.isPlaying,
  currentTime: state.track.currentTime,
  newTime: state.track.newTime,
  duration: state.track.duration,
  volume: state.track.volume
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): GlobalPlayerProps | any => ({
  fetchTrack: async () => {
    await dispatch(trackOperations.fetchTrack(567463899));
  },
  onAudioCanPlay: (duration: number) => {
    dispatch(actions.setAudioDuration(duration));
  },
  onAudioPlay: () => {
    dispatch(actions.setAudioStatus(true));
  },
  onAudioPause: () => {
    dispatch(actions.setAudioStatus(false));
  },
  onAudioVolumeChange: (volume: number) => {
    dispatch(() => {});
  },
  onAudioTimeUpdate: (currentTime: number) => {
    dispatch(actions.setAudioCurrentTime(currentTime));
  },
  onAudioTimeChange: (newTime: number) => {
    dispatch(actions.setAudioNewTime(newTime));
  }
});

const GlobalPlayerContainer: ConnectedComponent<
  typeof GlobalPlayerComponent,
  any
> = connect(mapStateToProps, mapDispatchToProps)(GlobalPlayerComponent);

export default GlobalPlayerContainer;
