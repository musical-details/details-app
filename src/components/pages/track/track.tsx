import React, { Dispatch, ComponentClass } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router-dom";

import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";
import Timeline from "../../entities/timeline/Timeline";
import MomentEditor from "../../entities/moment-editor/moment-editor";
import "./track.scss";

import { AppState } from "../../../core/state/store";
import { Rating } from "../../../core/state/ducks/viewed-track/viewed-track.state";

import trackActions from "../../../core/state/ducks/track/track.actions";
import trackOperations from "../../../core/state/ducks/track/track.operations";

import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import viewedTrackOperations from "../../../core/state/ducks/viewed-track/viewed-track.operations";
import viewedTrackSelectors from "../../../core/state/ducks/viewed-track/viewed-track.selectors";
import { runInThisContext } from "vm";
import { track } from "../../../core/state/ducks";

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
  setPlayer: () => void;
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

type TrackState = any;

class TrackComponent extends React.Component<TrackProps, TrackState> {
  constructor(props: TrackProps) {
    super(props);
  }

  componentDidMount() {
    this.loadTrack();
  }

  componentDidUpdate(oldProps: TrackProps) {
    if (this.props.match.params.trackId != oldProps.match.params.trackId) {
      this.loadTrack();
    }
  }

  async loadTrack() {
    const trackId: number = this.props.match.params.trackId;

    this.readParams(trackId);
    await this.props.fetchTrack(trackId);
  }

  readParams(trackId: number) {
    if (this.props.trackId != trackId) {
      this.props.unsetPlayer();
    } else {
      this.props.setPlayer();
    }
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

  newCurrentTime = (newTime: number): void =>{

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
        <div className="track-moment-editor-wrapper">
          <MomentEditor/>
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
  setPlayer: () => {
    dispatch(viewedTrackActions.setInPlayer());
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
