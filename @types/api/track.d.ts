export {};
declare global {
  export namespace Track {
    export type TrackId = string;

    export interface Track {
      _id: Track.TrackId;
      sources: Track.Sources;
      genreIds: string[];
      moodIds?: string[];
      audioUrl: string;
      waveSticks: number[];
      artist: string;
      title: string;
      coverUrl?: string;
      createdAt: System.Timestamp;
      updatedAt: System.Timestamp;
    }

    export type WaveStick = {
      _id: string;
      value: number;
    };

    export type Sources = {
      soundCloudId?: string;
      spotifyId?: string;
    };

    export type TrackExtension = Track.Track & {
      genres: Genre.Genre[];
      moods?: Mood.Mood[]; // TODO
      ratings: Rating.Rating[];
    };
  }
}
