import React from "react";
import TrackInfo from "../../entities/track-info/track-info";
import TrackWaver from "../../entities/track-waver/track-waver";
import Timeline from "../../entities/timeline/Timeline";

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
  wave: Array<number>;
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
      cover: "https://i1.sndcdn.com/artworks-000233611512-5kytd7-t200x200.jpg",
      author: "Confessions Mix",
      title: "Dateless - Confession Mix #11"
    },

    player: {
      audio: "",
      wave: [],
      isPlaying: false,
      currentTime: 14900,
      duration: 360000
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

  componentDidMount() {
    this.randomWave();
  }

  randomWave() {
    let wave: Array<number> = [];
    let min = Math.ceil(30);
    let max = Math.floor(90);

    for (let i = 0; i < 200; ++i) {
      wave.push(Math.floor(Math.random() * (max - min)) + min);
    }

    this.setState((prevState: TrackState) => ({
      ...prevState,
      player: { ...prevState.player, wave: wave }
    }));
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
        <div className="timeline-wrapper">
          <Timeline 
            duration={this.state.player.duration} 
            moment={[]} 
            currentTime={this.state.player.currentTime}
          ></Timeline>
          </div>
        <div>"Track Description" section</div>
      </div>
    );
  }
}

export default TrackComponent;
