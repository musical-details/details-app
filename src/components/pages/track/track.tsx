import React from "react";
import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";

import "./track.scss";

type TrackState = {
  info: TrackInfoState;
  player: TrackPlayerState;
  selectedRating: SelectedRatingState;
};

type TrackInfoState = {
  cover: string;
  author: string;
  title: string;
};

type TrackPlayerState = {
  audio: any;
  wave: [];
  isPlaying: boolean;
  currentTime: number;
  duration: number;
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
      wave: [],
      isPlaying: false,
      currentTime: 0,
      duration: 360
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
        <div className="track-waver-wrapper">
          <TrackWaver
            wave={this.state.player.wave}
            isPlaying={this.state.player.isPlaying}
            currentTime={this.state.player.currentTime}
            duration={this.state.player.duration}
          ></TrackWaver>
        </div>
        <div>"Track Timeline" section</div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

export default TrackComponent;
