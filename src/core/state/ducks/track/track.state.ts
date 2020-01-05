export interface AppTrackState {
  readonly trackId: number;
  readonly autoplay: boolean;
  readonly cover: string;
  readonly author: string;
  readonly title: string;
  readonly audioSource: string;
  readonly isPlaying: boolean;
  readonly isRecording: boolean;
  readonly currentTime: number;
  readonly recordedTimeStart: number;
  readonly recordedTimeEnd: number;
  readonly newTime: number;
  readonly duration: number;
  readonly volume: number;
}

export const initialState: AppTrackState = {
  trackId: 0,
  autoplay: false,
  cover: "",
  author: "",
  title: "",
  audioSource: "",
  isPlaying: false,
  isRecording: false,
  currentTime: 0,
  recordedTimeStart: 0,
  recordedTimeEnd: 0,
  newTime: 0,
  duration: 0,
  volume: 1
};
