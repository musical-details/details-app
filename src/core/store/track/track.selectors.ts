import { getGenres } from "./../genre/genre.selectors";
import { AppState } from "../models";
import { getRatings } from "../rating/rating.selectors";
import { notEmpty } from "../../../utils";

export const getTracks = (state: AppState): Track.Track[] => {
  return state.track.tracks;
};

export const getTracksCount = (state: AppState): number => {
  return state.track.tracks.length;
};

export const getTrackExtensions = (state: AppState): Track.TrackExtension[] => {
  const tracks: Track.Track[] = getTracks(state);
  const genres: Genre.Genre[] = getGenres(state);
  const ratings: Rating.Rating[] = getRatings(state);

  const trackExtensions: Track.TrackExtension[] = tracks.map((track) => ({
    ...track,
    genres: track.genreIds
      .map((genreId) => genres.find((genre) => genre._id === genreId))
      .filter(notEmpty),
    ratings: ratings.filter((rating) => rating.trackId === track._id),
  }));
  return trackExtensions;
};
