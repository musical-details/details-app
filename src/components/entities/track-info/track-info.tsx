import React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { Dispatch } from "redux";
import { connect, ConnectedComponent } from "react-redux";

import "./track-info.scss";
import VolumeIcon from "../../../assets/svg/volume-icon.svg";
import { AppState } from "../../../core/state/store";
import * as tasks from "../../../core/state/ducks/tasks";

const mapStateToProps = (state: AppState): TrackInfoProps | any => ({
  trackId: state.viewedTrack.trackId,
  cover: state.viewedTrack.cover,
  author: state.viewedTrack.author,
  title: state.viewedTrack.title,
  isSetInPlayer: state.viewedTrack.isSetInPlayer,
  isPlaying: state.track.isPlaying,
  volume: state.track.volume
});

const mapDispatchToProps = (dispatch: Dispatch<any>): TrackInfoProps | any => ({
  onTransferTrackToPlayer: () => {
    dispatch(tasks.trackOperations.transferViewedTrackToPlayer(true));
  },
  onToogleStatusTrack: () => {
    dispatch(tasks.trackActions.toogleAudioStatus());
  },
  onVolumeChange: (newVolume: number) => {
    dispatch(tasks.trackActions.setAudioVolume(newVolume));
  }
});

type TrackInfoProps = {
  trackId: number;
  cover: string;
  author: string;
  title: string;
  isPlaying: boolean;
  isSetInPlayer: boolean;
  volume: number;
  onTransferTrackToPlayer: () => void;
  onToogleStatusTrack: () => void;
  onVolumeChange: (newVolume: number) => void;
};

type TrackInfoState = {};

class TrackInfo extends React.Component<TrackInfoProps, TrackInfoState> {
  constructor(props: TrackInfoProps) {
    super(props);
  }

  handlePlayButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!this.props.isSetInPlayer) {
      this.props.onTransferTrackToPlayer();
    }
    this.props.onToogleStatusTrack();
  };

  handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    console.log(event.nativeEvent.offsetX);
    // this.props.onVolumeChange(event.nativeEvent.offsetX / 143);
  };

  handleVolumeDrag = (event: DraggableEvent, data: DraggableData) => {
    // this.props.onVolumeChange(data.x / 143);
  };

  handleVolumeDragStop = (event: DraggableEvent, data: DraggableData) => {
    this.props.onVolumeChange(data.x / 143);
  };

  render() {
    const status: boolean = this.props.isSetInPlayer && this.props.isPlaying;
    let playButtonClassName: string = status ? "button active" : "button";
    let playButtonIcon: string = status ? "icon-pause" : "icon-play";
    let volume: number = this.props.volume * 143;
    return (
      <div className="track-info">
        <div>
          <div className="track-cover-box">
            <div>
              <div
                className="track-cover"
                style={{ backgroundImage: `url(${this.props.cover})` }}
              />
            </div>
          </div>
          <div className="track-content-box">
            <div className="track-description">
              <div>
                <div className="track-author">
                  <span>{this.props.author}</span>
                </div>
                <div className="track-title">
                  <span>{this.props.title}</span>
                </div>
              </div>
            </div>
            <div className="track-player">
              <div>
                <div className="button-box">
                  <div
                    className={playButtonClassName}
                    onClick={this.handlePlayButtonClick}
                  >
                    <i className={playButtonIcon} />
                  </div>
                </div>
                <div className="button-box">
                  <div className="button">
                    <i className="icon-star-filled" />
                  </div>
                </div>
                <div className="button-box">
                  <div className="button">
                    <i className="icon-note" />
                  </div>
                </div>
                <div className="wide-button-box">
                  <div className="button">
                    <div className="left">
                      <i className="icon-volume" />
                    </div>
                    <div className="right">
                      <div className="volume-slider-box">
                        <div
                          className="volume-area"
                          onClick={this.handleVolumeClick}
                        >
                          <Draggable
                            axis="x"
                            bounds=".volume-area"
                            onDrag={this.handleVolumeDrag}
                            onStop={this.handleVolumeDragStop}
                            position={{ x: volume, y: 0 }}
                          >
                            <div className="volume-knob-area">
                              <div className="volume-gray-bar" />
                              <div className="knob" />
                            </div>
                          </Draggable>
                          <div className="bar" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const TrackInfoContainer: ConnectedComponent<typeof TrackInfo, any> = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackInfo);

export default TrackInfoContainer;
