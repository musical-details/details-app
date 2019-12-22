import types from "./track.types";

type Action = {
  type: string;
  payload?: any;
  meta?: any;
  error?: boolean;
};

const fetchMeta = (trackId: number) => ({
  type: types.FETCH_META,
  payload: {
    trackId
  }
});

const fetchAudio = (trackId: number) => ({
  type: types.FETCH_AUDIO,
  payload: {
    trackId
  }
});

export default {
  fetchMeta,
  fetchAudio
};
