import React, { Dispatch, ComponentClass } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router-dom";

import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";
import Timeline from "../../entities/timeline/Timeline";
import "./track.scss";

import { AppState } from "../../../core/state/store";
import { Rating } from "../../../core/state/ducks/viewed-track/viewed-track.state";

import trackActions from "../../../core/state/ducks/track/track.actions";
import trackOperations from "../../../core/state/ducks/track/track.operations";

import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import viewedTrackOperations from "../../../core/state/ducks/viewed-track/viewed-track.operations";
import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors";

type TrackProps = {
  playerTrackId: number;
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
  ratings: Array<Rating>;
  selectedRating: Rating | undefined;
  selectedMoments: [];
  match?: any;
  unsetPlayer: () => void;
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

class TrackComponent extends React.Component<TrackProps, TrackState> {
  audio: HTMLAudioElement;
  state: TrackState | any = {
    selectedRating: {
      id_rating: 1,
      user: {
        id_user: 1,
        nickname: "daddyaddy",
        avatar: ""
      },
      moments: [
        {
          name: "Bass",
          description: "Descc",
          color: "#9C27BD",
          start: 8000,
          end: 17000,
          timelineSection: 1
        },
        {
          name: "Bass2",
          description: "Descc",
          color: "#9C27BD",
          start: 18000,
          end: 20000,
          timelineSection: 1
        },
        {
          name: "Drums",
          description: "Descc",
          color: "#00bcd4",
          start: 20000,
          end: 24000,
          timelineSection: 2
        },
        {
          name: "Vocals",
          description: "Descc",
          color: "#e91e63",
          start: 20000,
          end: 24000,
          timelineSection: 3
        }
      ]
    }
  };

  constructor(props: TrackProps) {
    super(props);
    this.audio = new Audio();
  }

  componentDidMount() {
    this.loadTrack();
  }

  componentDidUpdate(oldProps: TrackProps) {
    if (this.props.match.params != oldProps.match.params) {
      this.loadTrack();
    }
  }

  async loadTrack() {
    const { trackId } = this.props.match.params;

    if (this.props.trackId != trackId) {
      this.props.unsetPlayer();
    }
    await this.props.fetchTrack(parseInt(trackId));
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
            wave={this.props.wave}
            currentTime={this.props.isSetInPlayer ? this.props.currentTime : 0}
            duration={this.props.isSetInPlayer ? this.props.duration : 1}
            onChangeTime={this.handleChangeTime}
          ></TrackWaver>
        </div>
        <div className="track-timeline-wrapper">
          <Timeline
            currentTime={this.props.isSetInPlayer ? this.props.currentTime : 0}
            duration={this.props.isSetInPlayer ? this.props.duration : 1}
            moment={this.props.selectedMoments}
          ></Timeline>
        </div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): TrackProps | any => ({
  playerTrackId: state.track.trackId,
  trackId: state.viewedTrack.trackId,
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  cover: state.viewedTrack.cover,
  author: state.viewedTrack.author,
  title: state.viewedTrack.title,
  audio: state.track.audioSource,
  wave: state.viewedTrack.wave,
  isPlaying: state.track.isPlaying,
  currentTime: state.track.currentTime,
  duration: state.track.duration,
  volume: state.track.volume,
  ratings: state.viewedTrack.ratings,
  selectedRating: viewedTrackSelectors.getSelectedRating(state),
  selectedMoments: viewedTrackSelectors.getSelectedMoments(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TrackProps | any => ({
  unsetPlayer: () => {
    dispatch(viewedTrackActions.unsetInPlayer());
  },
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
