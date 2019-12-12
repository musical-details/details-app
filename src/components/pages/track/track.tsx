import React from "react";
import TrackInfo from "../../entities/track-info/track-info";

type TrackState = {
  info: TrackInfoState;
  player: TrackPlayerState;
};

type TrackInfoState = {
  cover: string;
  author: string;
  title: string;
};

type TrackPlayerState = {
  audio: any;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

class TrackComponent extends React.Component<any, TrackState | any> {
  state: TrackState = {
    info: {
      cover:
        "https://images.genius.com/78a0742338c4324d69ee0c47f62dae2e.1000x1000x1.jpg",
      author: "The Dumplings",
      title: "Możliwość Wyspy"
    },

    player: {
      audio: "",
      isPlaying: false,
      currentTime: 0,
      duration: 0
    }
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="track-info-wrapper">
          <TrackInfo
            cover={this.state.info.cover}
            author={this.state.info.author}
            title={this.state.info.title}
          ></TrackInfo>
        </div>
        <div>"Track Timeline" section</div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

export default TrackComponent;
