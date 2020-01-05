import React from "react";
import { connect, ConnectedComponent } from "react-redux";
import { Dispatch } from "redux";
import CSS from "csstype";

import "./global-player.scss";
import { AppState } from "../../../core/state/store";
import trackOperations from "../../../core/state/ducks/track/track.operations";
import actions from "../../../core/state/ducks/track/track.actions";
import { NavLink } from "react-router-dom";

const mapStateToProps = (state: AppState): GlobalPlayerProps | any => ({
  autoplay: state.track.autoplay,
  trackId: state.track.trackId,
  cover: state.track.cover,
  author: state.track.author,
  title: state.track.title,
  audioSource: state.track.audioSource,
  isPlaying: state.track.isPlaying,
  isRecording: state.track.isRecording,
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
  toogleAudioPlay: () => {
    dispatch(actions.toogleAudioStatus());
  },
  onAudioAutoplay: () => {
    dispatch(actions.setAudioStatus(true));
    dispatch(actions.setAudioAutoplay(false));
  },
  onAudioPlay: () => {
    dispatch(actions.setAudioStatus(true));
  },
  onAudioPause: () => {
    dispatch(actions.setAudioStatus(false));
  },
  onAudioRecordStart: () => {
    dispatch(trackOperations.startRecording());
  },
  onAudioRecordStop: () => {
    dispatch(trackOperations.stopRecording());
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

type GlobalPlayerProps = {
  trackId: number;
  autoplay: boolean;
  cover: string;
  author: string;
  title: string;
  audioSource: string;
  isPlaying: boolean;
  isRecording: boolean;
  currentTime: number;
  newTime: number;
  duration: number;
  volume: number;
  fetchTrack: () => void;
  toogleAudioPlay: () => void;
  onAudioCanPlay: (duration: number) => void;
  onAudioAutoplay: () => void;
  onAudioPlay: () => void;
  onAudioPause: () => void;
  onAudioRecordStart: () => void;
  onAudioRecordStop: () => void;
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
  allowToKeyPressOnSpaceTimeout: NodeJS.Timeout | any;
  isAllowToKeyPressOnSpace: boolean;

  constructor(props: GlobalPlayerProps) {
    super(props);
    this.audio = new Audio();
    this.isAllowToKeyPressOnSpace = true;
  }

  async componentDidMount() {
    await this.props.fetchTrack();
    await this.loadAudio();
    this.loadAudioController();
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
    if (this.props.autoplay) this.props.onAudioAutoplay();
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
    this.audio.volume = this.props.volume;
    this.audio.oncanplaythrough = this.handleAudioCanPlay;
    this.audio.onplay = this.handleAudioPlay;
    this.audio.ontimeupdate = this.handleAudioTimeUpdate;
    this.audio.onpause = this.handleAudioPause;
    this.audio.onended = this.handleAudioEnded;
    this.audio.onwaiting = this.handleAudioWaiting;
    this.audio.onerror = this.handleAudioError;
  }

  loadAudioController() {
    window.onkeypress = (event: Event | any): void => {
      switch (event.which) {
        case 32:
          if (!this.isAllowToKeyPressOnSpace) return;
          event.preventDefault();
          this.props.toogleAudioPlay();
          this.isAllowToKeyPressOnSpace = false;
          this.allowToKeyPressOnSpaceTimeout = setTimeout(() => {
            this.isAllowToKeyPressOnSpace = true;
          }, 100);
          return;
      }
    };

    window.onkeydown = (event: Event | any): void => {
      const { currentTime, duration } = this.props;
      let diffTime: number = 0.5;
      switch (event.which) {
        case 37:
          event.preventDefault();
          const prevTime: number =
            currentTime > diffTime ? currentTime - diffTime : 0;
          this.audio.currentTime = prevTime;
          return;
        case 39:
          event.preventDefault();
          const nextTime: number =
            duration > currentTime + diffTime
              ? currentTime + diffTime
              : duration - (currentTime + diffTime);
          this.audio.currentTime = nextTime;
          return;
        default:
          break;
      }
    };
  }

  handlePlayButtonClick = (event: React.MouseEvent) => {
    this.props.isPlaying ? this.props.onAudioPause() : this.props.onAudioPlay();
  };

  handleRecordButtonClick = (event: React.MouseEvent) => {
    this.props.isRecording
      ? this.props.onAudioRecordStop()
      : this.props.onAudioRecordStart();
  };

  handleBarAreaClick = (event: React.MouseEvent | any) => {
    const { offsetX, toElement } = event.nativeEvent;
    const newTime = (offsetX / toElement.offsetWidth) * this.props.duration;
    this.props.onAudioTimeChange(newTime);
  };

  render() {
    const { currentTime, duration, isPlaying, isRecording } = this.props;

    let BarNotFillStyles: CSS.Properties = {
      width: 100 - (currentTime / duration) * 100 + "%"
    };

    let TrackCoverStyles: CSS.Properties = {
      backgroundImage: `url(${this.props.cover})`
    };

    let playButtonIcon: string = isPlaying ? "icon-pause" : "icon-play";

    let recordButtonActive: string = isRecording ? "active" : "";

    return (
      <div className="global-player">
        <div>
          <div
            className="button playing-box"
            onClick={this.handlePlayButtonClick}
          >
            <i className={playButtonIcon}></i>
          </div>
          <div
            className={`button recording-box ${recordButtonActive}`}
            onClick={this.handleRecordButtonClick}
          >
            <div className="background"></div>
            <i className="icon-note"></i>
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

const GlobalPlayerContainer: ConnectedComponent<
  typeof GlobalPlayerComponent,
  any
> = connect(mapStateToProps, mapDispatchToProps)(GlobalPlayerComponent);

export default GlobalPlayerContainer;
