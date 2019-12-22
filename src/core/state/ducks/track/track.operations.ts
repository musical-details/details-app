import actions from "./track.actions";

const fetchTrack = (trackId: number) => (dispatch: Function) => {
  dispatch(actions.fetchMeta(trackId));
  dispatch(actions.fetchAudio(trackId));
};
