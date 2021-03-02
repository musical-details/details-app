import { AppState } from "../models";
import { getTracks } from "../track/track.selectors";
import { getUsers } from "../user/user.selectors";

export const getRatings = (state: AppState): Rating.Rating[] => {
  return state.rating.ratings;
};

export const getRatingExtensions = (
  state: AppState
): Rating.RatingExtension[] => {
  const ratings: Rating.Rating[] = getRatings(state);
  const users: User.User[] = getUsers(state);
  const tracks: Track.Track[] = getTracks(state);

  const ratingExtensions: Rating.RatingExtension[] = ratings.map((rating) => ({
    ...rating,
    user: users.find((user) => user._id === rating.userId),
    track: tracks.find((track) => track._id === rating.trackId),
  }));

  return ratingExtensions;
};
