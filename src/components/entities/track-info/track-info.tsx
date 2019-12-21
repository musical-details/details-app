import React from "react";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";

import "./track-info.scss";
import VolumeIcon from "../../../assets/svg/volume-icon.svg";

type TrackInfoProps = {
  cover: string;
  author: string;
  title: string;
  isPlaying: boolean;
  volume: number;
  onPlayButtonClick: (isPlaying: boolean) => void;
  onVolumeSliderDrag: (volume: number) => void;
  onVolumeSliderDragStop: (volume: number) => void;
};

class TrackInfo extends React.Component<TrackInfoProps> {
  constructor(props: TrackInfoProps) {
    super(props);
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.props.onPlayButtonClick(this.props.isPlaying);
  };

  handleVolumeClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.props.onVolumeSliderDrag(event.nativeEvent.offsetX / 143);
    this.props.onVolumeSliderDragStop(event.nativeEvent.offsetX / 143);
  };

  handleDrag = (event: DraggableEvent, data: DraggableData) => {
    this.props.onVolumeSliderDrag(data.x / 143);
  };

  handleDragStop = (event: DraggableEvent, data: DraggableData) => {
    this.props.onVolumeSliderDragStop(data.x / 143);
  };

  render() {
    let playButtonClassName: string = this.props.isPlaying
      ? "button active"
      : "button";
    let playButtonIcon: string = this.props.isPlaying
      ? "icon-pause"
      : "icon-play";
    let volume: number = this.props.volume * 143;
    return (
      <div className="track-info">
        <div>
          <div className="track-cover-box">
            <div>
              <div
                className="track-cover"
                style={{ backgroundImage: `url(${this.props.cover})` }}
              ></div>
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
                    onClick={this.handleClick}
                  >
                    <i className={playButtonIcon}></i>
                  </div>
                </div>
                <div className="button-box">
                  <div className="button">
                    <i className="icon-star-filled"></i>
                  </div>
                </div>
                <div className="button-box">
                  <div className="button">
                    <i className="icon-note"></i>
                  </div>
                </div>
                <div className="wide-button-box">
                  <div className="button">
                    <div className="left">
                      <i className="icon-volume"></i>
                    </div>
                    <div className="right">
                      <div className="volume-slider-box">
                        <div
                          className="volume-area"
                          onMouseDown={this.handleVolumeClick}
                        >
                          <Draggable
                            axis="x"
                            bounds=".volume-area"
                            onDrag={this.handleDrag}
                            onStop={this.handleDragStop}
                            position={{ x: volume, y: 0 }}
                          >
                            <div className="volume-knob-area">
                              <div className="volume-gray-bar"></div>
                              <div className="knob"></div>
                            </div>
                          </Draggable>
                          <div className="bar"></div>
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

export default TrackInfo;
