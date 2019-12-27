import { Dispatch } from "react";
import actions from "./viewed-track.actions";
import { API_KEY, SoundCloud } from "../../../soundcloud";
import { AnyAction } from "redux";
import mocks from "../../../../mocks";

function fetchViewedTrack(trackId: number) {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: Function
  ): Promise<any> => {
    dispatch(actions.setTrackId(trackId));
    const metaUrl: string = `https://api.soundcloud.com/tracks/${trackId}?client_id=${API_KEY}`;
    const waveUrl: string = `localhost`;
    try {
      dispatch(actions.fetchMetaPending(trackId));
      const response: Response = await fetch(metaUrl);
      const data: SoundCloud.TrackData = await response.json();
      dispatch(actions.fetchMetaSuccess(data));
    } catch (error) {
      dispatch(actions.fetchMetaError(error));
      return;
    }
    try {
      dispatch(actions.fetchWavePending());
      const responseMock = mocks.randomWave();
      dispatch(actions.fetchWaveSuccess(responseMock));
    } catch (error) {
      dispatch(actions.fetchWaveError(error));
      return;
    }
    // fetch ratings
  };
}

export default {
  fetchViewedTrack
};
