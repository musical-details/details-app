export interface AppTrackState {
  readonly trackId: number;
  readonly cover: string;
  readonly author: string;
  readonly title: string;
  readonly audioSource: string;
  readonly wave: Array<number>;
  readonly isPlaying: boolean;
  readonly currentTime: number;
  readonly duration: number;
  readonly volume: number;
}

export const initialState: AppTrackState = {
  trackId: 0,
  cover: "",
  author: "",
  title: "",
  audioSource: "",
  wave: [],
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1
};
