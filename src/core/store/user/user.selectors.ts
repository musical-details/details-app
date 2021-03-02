import { notEmpty } from "./../../../utils/index";
import { AppState } from "../models";
import { getRatings } from "../rating/rating.selectors";
import { getTracks } from "../track/track.selectors";

export const getUsers = (state: AppState): User.User[] => {
  return state.user.users;
};

export const getUsersCount = (state: AppState): number => {
  const users: User.User[] = getUsers(state);
  return users.length;
};

export const getUsersExtensions = (state: AppState): User.UserExtension[] => {
  const users: User.User[] = getUsers(state);
  const tracks: Track.Track[] = getTracks(state);
  const ratings: Rating.Rating[] = getRatings(state);
  const usersEx: User.UserExtension[] = users.map((user) => ({
    ...user,
    favouriteTracks: user.favouriteTracksIds
      .map((trackId) => tracks.find((track) => track._id === trackId))
      .filter(notEmpty),
    ratings: ratings.filter((rating) => rating.userId === user._id),
  }));

  return usersEx;
};
