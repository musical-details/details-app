import React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { Dispatch } from "redux";
import CSS from "csstype";

import "./global-player.scss";
import { AppState } from "../../../core/state/store";
import trackOperations from "../../../core/state/ducks/track/track.operations";
import actions from "../../../core/state/ducks/track/track.actions";

type GlobalPlayerProps = {
  cover: string;
  author: string;
  title: string;
  audioSource: string;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  fetchTrack: () => void;
  onAudioCanPlay: (duration: number) => void;
  onAudioPlay: () => void;
  onAudioPause: () => void;
  onAudioVolumeChange: (volume: number) => void;
  onAudioTimeUpdate: (currentTime: number) => void;
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

  componentDidMount() {
    this.loadAudio();
  }

  componentWillReceiveProps(nextProps: GlobalPlayerProps) {
    if (this.props.isPlaying !== nextProps.isPlaying) {
      nextProps.isPlaying ? this.audio.play() : this.audio.pause();
    }
    if (this.props.audioSource !== nextProps.audioSource) {
      this.loadAudio();
    }
  }

  componentWillUnmount() {
    this.audio.pause();
    delete this.audio;
  }

  handleAudioCanPlay = () => {
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
    await this.props.fetchTrack();
    this.audio = new Audio(this.props.audioSource);
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
            <div className="bar">
              <div className="not-fill" style={BarNotFillStyles}></div>
            </div>
          </div>
          <div className="volume-box">
            <i className="icon-volume"></i>
          </div>
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): GlobalPlayerProps | any => ({
  cover: state.track.cover,
  author: state.track.author,
  title: state.track.title,
  audioSource: state.track.audioSource,
  isPlaying: state.track.isPlaying,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  volume: state.track.volume
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): GlobalPlayerProps | any => ({
  fetchTrack: async () => {
    await dispatch(trackOperations.fetchTrack(577456752));
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
  }
});

const GlobalPlayerContainer: ConnectedComponent<
  typeof GlobalPlayerComponent,
  any
> = connect(mapStateToProps, mapDispatchToProps)(GlobalPlayerComponent);

export default GlobalPlayerContainer;
