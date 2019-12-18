import React from "react";
import { SC_API_KEY, SC_Track_Stream } from "../../../core/soundcloud";

import "./global-player.scss";

type GlobalPlayerState = {
  audio_url: string;
  audio: HTMLAudioElement;
  isPlayed: boolean;
  playerIcon: string;
};

class GlobalPlayer extends React.Component {
  state: GlobalPlayerState = {
    audio_url: "",
    audio: new Audio(),
    isPlayed: false,
    playerIcon: "icon-play"
  };

  audio: HTMLAudioElement = new Audio(
    `https://api.soundcloud.com/tracks/205439549/stream?client_id=${SC_API_KEY}`
  );

  constructor(props: any) {
    super(props);
  }

  toogle = () => {
    this.setState(
      {
        isPlayed: !this.state.isPlayed
      },
      () => {
        this.state.isPlayed ? this.play() : this.pause();
      }
    );
  };

  play = () => {
    this.setState({
      playerIcon: "icon-pause"
    });
    this.state.audio.play();
  };

  pause = () => {
    this.setState({
      playerIcon: "icon-play"
    });
    this.state.audio.pause();
  };

  componentDidMount() {
    this.setState({
      audio_url: `https://api.soundcloud.com/tracks/205439549/stream?client_id=${SC_API_KEY}`,
      audio: new Audio(
        `https://api.soundcloud.com/tracks/205439549/stream?client_id=${SC_API_KEY}`
      )
    });
  }

  render() {
    return (
      <div className="global-player">
        <div>
          <div className="button" onClick={this.toogle}>
            <i className={this.state.playerIcon}></i>
          </div>
          <div className="bar-box">
            <div className="bar"></div>
          </div>
          <div className="volume-box">
            <i className="icon-volume"></i>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalPlayer;
