import { AppState } from "../../store";
import { createSelector } from "reselect";
import { Rating, Moment } from "../../../shared";

function getUserRating(state: AppState): Rating {
  const { isLogged, nickname, avatar, userId } = state.user;
  if (!isLogged) {
    return {
      ratingId: -1,
      user: {
        userId: 0,
        nickname: ``,
        avatar: ``,
      },
      moments: [],
    };
  }
  const { userRatingId, ratings } = state.viewedTrack;
  const rating: Rating | undefined = ratings.find(
    (rating) => rating.ratingId === userRatingId
  );
  return rating !== undefined
    ? rating
    : {
        ratingId: -1,
        user: {
          userId: userId,
          nickname: nickname,
          avatar: avatar,
        },
        moments: [],
      };
}

function getSelectedRating(state: AppState): Rating | undefined {
  const { selectedRatingId, ratings } = state.viewedTrack;
  return ratings.find((rating) => rating.ratingId === selectedRatingId);
}

/**
 * test
 * @param state
 */
function getOtherRatings(state: AppState): Array<Rating> {
  const { ratings } = state.viewedTrack;
  const { userId } = state.user;
  return ratings.filter((rating) => rating.user.userId != userId);
}

function getSelectedMoments(state: AppState): Array<Moment> {
  const selectedRating: Rating | undefined = getSelectedRating(state);
  return selectedRating !== undefined ? selectedRating.moments : [];
}

export default {
  getUserRating,
  getSelectedRating,
  getSelectedMoments,
  getOtherRatings,
};
