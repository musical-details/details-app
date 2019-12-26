import { Dispatch } from "react";
import actions from "./track.actions";
import { API_KEY, SoundCloud } from "../../../soundcloud";
import { AnyAction } from "redux";

function fetchTrack(trackId: number) {
  return async (dispatch: Dispatch<AnyAction>): Promise<any> => {
    const metaUrl: string = `https://api.soundcloud.com/tracks/${trackId}?client_id=${API_KEY}`;
    const audioUrl: string = `https://api.soundcloud.com/tracks/${trackId}/stream?client_id=${API_KEY}`;
    try {
      dispatch(actions.setTrackId(trackId));
      dispatch(actions.fetchMetaPending(trackId));
      const response: Response = await fetch(metaUrl);
      const data: SoundCloud.TrackData = await response.json();
      dispatch(actions.fetchMetaSuccess(data));
      dispatch(actions.setAudioSource(audioUrl));
    } catch (error) {
      dispatch(actions.fetchMetaError(error));
      return;
    }
  };
}

function transferTrackToPlayer(data: {
  trackId: number;
  cover: string;
  author: string;
  title: string;
}) {
  return (dispatch: Dispatch<AnyAction>, getState: Function): void => {
    const audioUrl: string = `https://api.soundcloud.com/tracks/${data.trackId}/stream?client_id=${API_KEY}`;
    dispatch(actions.setTrackId(data.trackId));
    dispatch(
      actions.transferMetaSuccess({
        cover: data.cover,
        author: data.author,
        title: data.title
      })
    );
    dispatch(actions.setAudioSource(audioUrl));
  };
}

export default {
  fetchTrack,
  transferTrackToPlayer
};
