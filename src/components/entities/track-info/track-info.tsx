import React from "react";

import "./track-info.scss";
import TrackWaver from "../track-waver/track-waver";

type TrackInfoProps = {
  cover: string;
  author: string;
  title: string;
};

class TrackInfo extends React.Component<TrackInfoProps> {
  constructor(props: TrackInfoProps) {
    super(props);
  }

  render() {
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
                  <div>
                    <i className="icon-play"></i>
                  </div>
                </div>
                <div className="button">
                  <div>
                    <i className="icon-volume-up"></i>
                  </div>
                </div>
                <div className="waver">
                  <div>
                    <TrackWaver />
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
