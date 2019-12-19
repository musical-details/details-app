import React from "react";

import "./track-info.scss";
import TrackWaver from "../track-waver/track-waver";

type TrackInfoProps = {
  cover: string;
  author: string;
  title: string;
  isPlaying: boolean;
  onPlayButtonClick: (isPlaying: boolean) => void;
};

class TrackInfo extends React.Component<TrackInfoProps> {
  constructor(props: TrackInfoProps) {
    super(props);
  }

  handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.props.onPlayButtonClick(this.props.isPlaying);
  };

  render() {
    let playButtonIcon = this.props.isPlaying ? "icon-pause" : "icon-play";
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
                <div className="button">
                  <div onClick={this.handleClick}>
                    <i className={playButtonIcon}></i>
                  </div>
                </div>
                <div className="button">
                  <div>
                    <i className="icon-star-filled"></i>
                  </div>
                </div>
                <div className="button">
                  <div>
                    <i className="icon-note"></i>
                  </div>
                </div>
                <div className="wide-button">
                  <div>
                    <div className="left">
                      <i className="icon-volume"></i>
                    </div>
                    <div className="right">
                      <div className="volume-slider-box">
                        <div>
                          <div className="knob" draggable="true"></div>
                          <div className="bar">
                            <div className="not-fill"></div>
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
      </div>
    );
  }
}

export default TrackInfo;
