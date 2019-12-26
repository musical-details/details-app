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

type TrackProps = {
  trackId: number;
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
};

type TrackState = {
  player: TrackPlayerState;
  selectedRating: SelectedRatingState;
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

type SelectedRatingState = {
  id_rating: number;
  user: UserState;
  moments: Array<MomentState>;
};

class TrackComponent extends React.Component<TrackProps, TrackState> {
  trackId: number = 272630093;
  audio: HTMLAudioElement;
  state: TrackState = {
    player: {
      audio: new Audio(),
      wave: [],
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      volume: 1
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
    /*
      this.props.transferTrackToPlayer({
        trackId: this.props.trackId,
        cover: this.props.cover,
        title: this.props.title,
        author: this.props.author
      });
      */
  }

  async componentDidMount() {
    const { trackId } = this.props.match.params;
    await this.props.fetchTrack(trackId);
    this.fetchTrack(this.trackId);
    this.fetchAudio(this.trackId);
    this.randomWave();
  }

  async fetchTrack(trackId: number): Promise<any> {
    try {
      const url: string = `https://api.soundcloud.com/tracks/${trackId}?client_id=${API_KEY}`;
      const response: Response = await fetch(url);
      const data: SoundCloud.TrackData = await response.json();
      this.setState((prevState: TrackState) => ({
        ...prevState,
        info: {
          cover: data.artwork_url.toString().replace("large", "t500x500"),
          title: data.title,
          author: data.user.username
        }
      }));
    } catch (e) {
      console.error(e);
    }
  }

  handleCanPlay = () => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        duration: this.state.player.audio.duration
      }
    }));
  };

  handlePlay = () => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        isPlaying: true
      }
    }));
  };

  handlePause = () => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        isPlaying: false
      }
    }));
  };

  handleTimeUpdate = () => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        currentTime: this.state.player.audio.currentTime
      }
    }));
  };

  handleChangeTime = (newTime: number): void => {
    this.setState(
      (prevState: TrackState) => ({
        ...prevState,
        player: {
          ...prevState.player,
          currentTime: newTime
        }
      }),
      () => {
        this.state.player.audio.currentTime = newTime;
      }
    );
  };

  handleEnded = () => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        isPlaying: false
      }
    }));
  };

  handlePlayButtonClick = (isPlaying: boolean): void => {
    this.setState(
      (prevState: TrackState) => ({
        ...prevState,
        player: {
          ...prevState.player,
          isPlaying: !isPlaying
        }
      }),
      () => {
        const { isPlaying, audio } = this.state.player;
        isPlaying ? audio.play() : audio.pause();
      }
    );
  };

  handleVolumeSliderDrag = (volume: number): void => {
    try {
      const { audio } = this.state.player;
      audio.volume = volume;
    } catch (e) {
      console.error(e);
    }
  };

  handleVolumeSliderDragStop = (volume: number): void => {
    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: {
        ...prevState.player,
        volume: volume
      }
    }));
  };

  handleError = (event: any): void => {
    console.log(event); // TODO
    /*
    MEDIA_ERR_ABORTED=1
    MEDIA_ERR_NETWORK=2
    MEDIA_ERR_DECODE=3
    MEDIA_ERR_SRC_NOT_SUPPORTED=4
    */
  };

  handleWaiting = (event: any): any => {};

  fetchAudio(trackId: number): void {
    try {
      const url: string = `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${API_KEY}`;
      const audio: HTMLAudioElement = new Audio(url);
      this.setState(
        (prevState: TrackState) => ({
          ...prevState,
          player: {
            ...prevState.player,
            audio: new Audio(url)
          }
        }),
        () => {
          let { audio } = this.state.player;
          audio.oncanplaythrough = this.handleCanPlay;
          audio.onplay = this.handlePlay;
          audio.ontimeupdate = this.handleTimeUpdate;
          audio.onpause = this.handlePause;
          audio.onended = this.handleEnded;
          audio.onwaiting = this.handleWaiting;
          audio.onerror = this.handleError;
        }
      );
    } catch (e) {
      console.error(e);
    }
  }

  randomWave() {
    let wave: Array<number> = [];
    let min = Math.ceil(30);
    let max = Math.floor(90);

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
            volume={this.state.player.volume}
            isPlaying={this.state.player.isPlaying}
            onPlayButtonClick={this.handlePlayButtonClick}
            onVolumeSliderDrag={this.handleVolumeSliderDrag}
            onVolumeSliderDragStop={this.handleVolumeSliderDragStop}
          ></TrackInfo>
        </div>
        <div className="track-waver-wrapper">
          <TrackWaver
            wave={this.state.player.wave}
            currentTime={this.state.player.currentTime}
            duration={this.state.player.duration}
            onChangeTime={this.handleChangeTime}
          ></TrackWaver>
        </div>
        <div className="timeline-wrapper">
          <Timeline
            duration={this.state.player.duration}
            moment={this.state.selectedRating.moments}
            currentTime={this.state.player.currentTime}
          ></Timeline>
        </div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): TrackProps | any => ({
  trackId: state.viewedTrack.trackId,
  cover: state.viewedTrack.cover,
  author: state.viewedTrack.author,
  title: state.viewedTrack.title,
  audio: state.track.audioSource,
  wave: state.track.wave,
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
        trackId: data.trackId,
        cover: data.cover,
        author: data.author,
        title: data.title
      })
    );
  }
});

const TrackContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackComponent) as ConnectedComponent<typeof TrackComponent, any>
);

export default TrackContainer;
