import { AppState } from "../models";
import { getTracks } from "../track/track.selectors";
import { getUsers } from "../user/user.selectors";

export const getRatings = (state: AppState): Rating.Rating[] => {
  return state.rating.ratings;
};

export const getRatingCount = (state: AppState): number => {
  return state.rating.ratings.length;
};

export const getRatingsExt = (state: AppState): Rating.RatingExtension[] => {
  const ratings: Rating.Rating[] = getRatings(state);
  const users: User.User[] = getUsers(state);
  const tracks: Track.Track[] = getTracks(state);

  const ratingExt: Rating.RatingExtension[] = ratings.map((rating) => ({
    ...rating,
    user: users.find((user) => user._id === rating.userId),
    track: tracks.find((track) => track._id === rating.trackId),
  }));

  return ratingExt;
};
const dayInMs: number = 1000 * 3600 * 24;
export const getFreshRatingsExt = (
  state: AppState
): Rating.RatingExtension[] => {
  const ratingsExt: Rating.RatingExtension[] = getRatingsExt(state);
  const nowInMs: number = Date.now();

  const freshRatingsExt: Rating.RatingExtension[] = ratingsExt
    .filter((rating) => rating.createdAt >= nowInMs - 14 * dayInMs)
    .sort((ratingA, ratingB) =>
      ratingA.createdAt < ratingB.createdAt ? 1 : -1
    );
  return freshRatingsExt;
};

export const getFreshRatingsCount = (state: AppState): number => {
  const freshRatingsExt: Rating.RatingExtension[] = getFreshRatingsExt(state);
  const freshRatingsExtCount: number = freshRatingsExt.length;
  return freshRatingsExtCount;
};

export const getFreshRatingsCountsPerDay = (state: AppState): number[] => {
  const nowInMs: System.Timestamp = Date.now();
  const oldestDayInMs: System.Timestamp = nowInMs - 14 * dayInMs;
  const freshRatingsExt: Rating.RatingExtension[] = getFreshRatingsExt(state);
  const freshRatingsCountsPerDay: number[] = [...new Array(14)]
    .fill(0)
    .map((bucket: number, index: number) =>
      freshRatingsExt.filter(
        (rating) =>
          ~~((rating.createdAt - oldestDayInMs) / dayInMs) - 1 === index
      )
    )
    .map((bucket) => bucket.length);

  return freshRatingsCountsPerDay;
};
