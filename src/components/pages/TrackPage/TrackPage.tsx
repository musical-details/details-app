import React, { Dispatch, ComponentClass } from "react";
import { connect, ConnectedComponent } from "react-redux";
import { withRouter } from "react-router-dom";

import TrackInfo from "../../entities/@track/track-info/track-info";
import TrackWaver from "../../entities/@track/track-waver/track-waver";

import MiniTimeline from "../../entities/@track/mini-timeline/mini-timeline";
import Timeline from "../../entities/@track/timeline/Timeline";
import MomentEditor from "../../entities/@track/moment-editor/moment-editor";
import "./TrackPage.scss";

import { AppState } from "../../../core/state/store";

import * as tasks from "../../../core/state/ducks/tasks";
import RatingList from "../../entities/@track/rating-list/rating-list";
import { scrollTo } from "../../../utils";
import { RatingEditorMode } from "../../../core/state/ducks/rating-editor/rating-editor.state";
import {
  ITrackPageDispatchProps,
  ITrackPageProps,
  ITrackPageStateProps,
} from "./ITrackPageProps";
import { ITrackPageState } from "./ITrackPageState";

const mapStateToProps = (state: AppState): ITrackPageStateProps => ({
  playerTrackId: state.track.trackId,
  viewedTrackId: state.viewedTrack.trackId,
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  isPlaying: state.track.isPlaying,
  mode: state.ratingEditor.mode,
});

const mapDispatchToProps = (
  dispatch: Dispatch<any>
): ITrackPageDispatchProps => ({
  unsetPlayer: () => {
    dispatch(tasks.viewedTrackActions.unsetInPlayer());
  },
  setPlayer: () => {
    dispatch(tasks.viewedTrackActions.setInPlayer());
  },
  fetchTrack: async (trackId: number, ratingId?: number) => {
    await dispatch(
      tasks.viewedTrackOperations.fetchViewedTrack(trackId, ratingId)
    );
  },
});

const connector = connect(mapStateToProps, mapDispatchToProps);

class TrackPage extends React.Component<ITrackPageProps, ITrackPageState> {
  infoWrapperRef: React.RefObject<HTMLDivElement>;
  waverWrapperRef: React.RefObject<HTMLDivElement>;
  ratingsWrapperRef: React.RefObject<HTMLDivElement>;
  timelineWrapperRef: React.RefObject<HTMLDivElement>;
  momentEditorWrapperRef: React.RefObject<HTMLDivElement>;
  momentsDescriptionWrapperRef: React.RefObject<HTMLDivElement>;

  constructor(props: ITrackPageProps) {
    super(props);
    this.infoWrapperRef = React.createRef();
    this.ratingsWrapperRef = React.createRef();
    this.waverWrapperRef = React.createRef();
    this.timelineWrapperRef = React.createRef();
    this.momentEditorWrapperRef = React.createRef();
    this.momentsDescriptionWrapperRef = React.createRef();
  }

  componentDidMount() {
    this.loadTrack();
  }

  componentDidUpdate(oldProps: ITrackPageProps) {
    const { match, mode } = this.props;

    if (match.params.trackId != oldProps.match.params.trackId) {
      this.loadTrack();
    }
    if (mode !== oldProps.mode) {
      if (mode === RatingEditorMode.RECORDING) {
        scrollTo(this.ratingsWrapperRef);
      }
      if (mode === RatingEditorMode.MODIFYING) {
        scrollTo(this.momentEditorWrapperRef);
      }
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
      <div className="track-page">
        <div ref={this.infoWrapperRef} id="info-wrapper">
          <TrackInfo />
        </div>
        <div ref={this.waverWrapperRef} id="waver-wrapper">
          <TrackWaver />
        </div>
        <div ref={this.ratingsWrapperRef} id="rating-list-wrapper">
          <RatingList />
        </div>
        <div id="mini-timeline-wrapper">
          <MiniTimeline />
        </div>
        <div ref={this.timelineWrapperRef} id="timeline-wrapper">
          <Timeline />
        </div>
        <div ref={this.momentEditorWrapperRef} id="moment-editor-wrapper">
          <MomentEditor />
        </div>
        <div
          ref={this.momentsDescriptionWrapperRef}
          id="moments-description-wrapper"
        >
          "Track Description" section
        </div>
      </div>
    );
  }
}

export default withRouter(connector(TrackPage));
