import { AppState } from "./../../store";
import { Dispatch } from "react";
import actions from "./viewed-track.actions";
import { API_KEY, SoundCloud } from "../../../soundcloud";
import { AnyAction } from "redux";
import mocks from "../../../../mocks";
import { Rating } from "./viewed-track.state";

function fetchViewedTrack(trackId: number, selectedRatingId: number = -1) {
  return async (
    dispatch: Dispatch<AnyAction>,
    getState: () => AppState
  ): Promise<any> => {
    selectedRatingId = isNaN(selectedRatingId) ? -1 : selectedRatingId;
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
    try {
      const userId = getState().user.userId;
      dispatch(actions.fetchRatingsPending());
      const ratingsData: Array<Rating> = mocks.randomRatings(300);
      const userRating: Rating | undefined = ratingsData.find(
        rating => rating.ratingId === userId
      );
      const userRatingId = userRating === undefined ? -1 : userRating.ratingId;
      dispatch(actions.fetchRatingsSuccess(ratingsData));
      dispatch(actions.setSelectedRatingId(selectedRatingId));
      dispatch(actions.setUserRatingId(userRatingId));
    } catch (error) {
      dispatch(actions.fetchRatingsError(error));
    }
    if (trackId == getState().track.trackId) {
      dispatch(actions.setInPlayer());
    }
  };
}

export default {
  fetchViewedTrack
};
