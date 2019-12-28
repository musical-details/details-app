import { AppState } from "./../../store";
import { createSelector } from "reselect";
import { Rating, Moment } from "./viewed-track.state";

function getSelectedRating(state: AppState): Rating | undefined {
  return state.viewedTrack.ratings.find(rating => rating.ratingId);
}

function getSelectedMoments(state: AppState): Array<Moment> {
  const selectedRating: Rating | undefined = getSelectedRating(state);
  return selectedRating !== undefined ? selectedRating.moments : [];
}

export default {
  getSelectedRating,
  getSelectedMoments
};
