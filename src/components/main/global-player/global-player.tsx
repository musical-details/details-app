import React from "react";
import { SoundCloud, API_KEY } from "../../../core/soundcloud";
import CSS from "csstype";

import "./global-player.scss";

type GlobalPlayerState = {
  audio_url: string;
  audio: HTMLAudioElement;
  isPlayed: boolean;
  playerIcon: string;
  currentTime: number;
  duration: number;
  author: string;
  title: string;
  cover: string;
};

class GlobalPlayer extends React.Component<any, GlobalPlayerState> {
  state: GlobalPlayerState = {
    audio_url: "",
    audio: new Audio(),
    isPlayed: false,
    playerIcon: "icon-play",
    currentTime: 0,
    duration: 0,
    author: "",
    title: "",
    cover: ""
  };

  trackId: number = 723672529;

  constructor(props: any) {
    super(props);
    this.fetchTrack();
  }

  async fetchTrack(): Promise<any> {
    try {
      let url: string = `https://api.soundcloud.com/tracks/${this.trackId}?client_id=${API_KEY}`;
      const response: Response = await fetch(url);
      const data: SoundCloud.TrackData = await response.json();
      this.setState({
        cover: data.artwork_url,
        title: data.title,
        author: data.user.username
      });
    } catch (e) {
      console.error(e);
    }
  }

  componentDidMount() {
    let url: string = `https://api.soundcloud.com/tracks/${this.trackId}/stream?client_id=${API_KEY}`;
    this.setState(
      {
        audio_url: url,
        audio: new Audio(url)
      },
      () => {
        this.state.audio.oncanplaythrough = this.setDuration;
        this.state.audio.ontimeupdate = this.setCurrentTime;
        this.state.audio.onended = this.stopAudio;
      }
    );
  }

  handlePlayButtonClick = (): void => {
    this.setState({ isPlayed: !this.state.isPlayed }, this.toogleAudio);
  };

  toogleAudio = (): void => {
    this.state.isPlayed ? this.playAudio() : this.pauseAudio();
  };

  playAudio = (): void => {
    this.setState({ playerIcon: "icon-pause" });
    this.state.audio.play();
  };

  pauseAudio = (): void => {
    this.setState({ playerIcon: "icon-play" });
    this.state.audio.pause();
  };

  stopAudio = (): void => {
    this.setState({ playerIcon: "icon-play" });
    this.state.audio.load();
  };

  setDuration = (): void => {
    this.setState({ duration: this.state.audio.duration });
  };

  setCurrentTime = (): void => {
    this.setState({ currentTime: this.state.audio.currentTime });
  };

  render() {
    const { currentTime, duration } = this.state;
    let BarNotFillStyles: CSS.Properties = {
      width: 100 - (currentTime / duration) * 100 + "%"
    };

    return (
      <div className="global-player">
        <div>
          <div className="button" onClick={this.handlePlayButtonClick}>
            <i className={this.state.playerIcon}></i>
          </div>
          <div className="bar-box">
            <div className="bar">
              <div className="not-fill" style={BarNotFillStyles}></div>
            </div>
          </div>
          <div className="volume-box">
            <i className="icon-volume"></i>
          </div>
          <div className="track-box">
            <div className="left">
              <div
                className="track-cover"
                style={{ backgroundImage: `url(${this.state.cover})` }}
              ></div>
            </div>
            <div className="right">
              <div>
                <div>
                  <span className="author">{this.state.author}</span>
                </div>
                <div>
                  <span className="title">{this.state.title}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GlobalPlayer;
