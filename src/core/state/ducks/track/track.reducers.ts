import { combineReducers } from "redux";
import types from "./track.types";
import { number } from "prop-types";

interface TrackState {
  trackId: number;
  cover: string;
  author: string;
  title: string;
  audio: HTMLAudioElement;
  wave: Array<number>;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
}

const initialState: TrackState = {
  trackId: 0,
  cover: "",
  author: "",
  title: "",
  audio: new Audio(),
  wave: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0
};

const trackReducer = (state: TrackState = initialState, action: any) => {
  switch (action.type) {
    case types.FETCH_AUDIO:
      return {
        ...state,
        audio: new Audio(),
        wave: []
      };
    default:
      return state;
  }
};

export default trackReducer;
