import React, { Dispatch, ComponentClass } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router-dom";

import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";
import Timeline from "../../entities/timeline/Timeline";
import MomentEditor from "../../entities/moment-editor/moment-editor";
import "./track.scss";

import { AppState } from "../../../core/state/store";

import viewedTrackActions from "../../../core/state/ducks/viewed-track/viewed-track.actions";
import viewedTrackOperations from "../../../core/state/ducks/viewed-track/viewed-track.operations";
import RatingList from "../../entities/rating-list/rating-list";
import { scrollTo } from "../../../utils";

const mapStateToProps = (state: AppState): TrackProps | any => ({
  playerTrackId: state.track.trackId,
  viewedTrackId: state.viewedTrack.trackId,
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  isPlaying: state.track.isPlaying
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TrackProps | any => ({
  unsetPlayer: () => {
    dispatch(viewedTrackActions.unsetInPlayer());
  },
  setPlayer: () => {
    dispatch(viewedTrackActions.setInPlayer());
  },
  fetchTrack: async (trackId: number, ratingId?: number) => {
    await dispatch(viewedTrackOperations.fetchViewedTrack(trackId, ratingId));
  }
});

type TrackProps = {
  playerTrackId: number;
  viewedTrackId: number;
  isSetInPlayer: boolean;
  isPlaying: boolean;
  match?: any;
  unsetPlayer: () => void;
  setPlayer: () => void;
  fetchTrack: (trackId: number, ratingId: number) => void;
};

type TrackState = any;

class TrackComponent extends React.Component<TrackProps, TrackState> {
  trackInfoWrapperRef: React.RefObject<HTMLDivElement>;
  trackWaverWrapperRef: React.RefObject<HTMLDivElement>;
  trackRatingWrapperRef: React.RefObject<HTMLDivElement>;
  trackTimelineWrapperRef: React.RefObject<HTMLDivElement>;
  trackMomentEditorWrapperRef: React.RefObject<HTMLDivElement>;
  trackMomentsDescriptionWrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: TrackProps) {
    super(props);
    this.trackInfoWrapperRef = React.createRef();
    this.trackRatingWrapperRef = React.createRef();
    this.trackWaverWrapperRef = React.createRef();
    this.trackTimelineWrapperRef = React.createRef();
    this.trackMomentEditorWrapperRef = React.createRef();
    this.trackMomentsDescriptionWrapperRef = React.createRef();
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
    const trackId: number = parseInt(this.props.match.params.trackId);
    const ratingId: number = parseInt(this.props.match.params.ratingId);

    this.readParams(trackId);
    await this.props.fetchTrack(trackId, ratingId);
  }

  readParams(trackId: number) {
    if (this.props.viewedTrackId != trackId) {
      this.props.unsetPlayer();
    } else {
      this.props.setPlayer();
    }
  }

  render() {
    return (
      <div>
        <div ref={this.trackInfoWrapperRef} className="track-info-wrapper">
          <TrackInfo />
        </div>
        <div ref={this.trackWaverWrapperRef} className="track-waver-wrapper">
          <TrackWaver />
        </div>
        <div ref={this.trackRatingWrapperRef} className="track-rating-list">
          <RatingList />
        </div>
        <div
          ref={this.trackTimelineWrapperRef}
          className="track-timeline-wrapper"
        >
          <Timeline />
        </div>
        <div
          ref={this.trackMomentEditorWrapperRef}
          className="track-moment-editor-wrapper"
        >
          <MomentEditor />
        </div>
        <div
          ref={this.trackMomentsDescriptionWrapperRef}
          className="track-moments-description-wrapper"
        >
          "Track Description" section
        </div>
      </div>
    );
  }
}

const TrackContainer: ComponentClass = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TrackComponent) as ConnectedComponent<typeof TrackComponent, any>
);

export default TrackContainer;
