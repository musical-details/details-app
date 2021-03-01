export {};
declare global {
  export namespace Track {
    export interface Track {
      _id: string;
      genreId?: string;
      audioUrl: string;
      waveSticks: Track.WaveStick;
      title: string;
      artist: string;
      coverUrl: string;
      _created_at: System.Timestamp;
      _updated_at: System.Timestamp;
    }

    export interface Genre {
      _id: string;
      name: string;
    }

    export type WaveStick = {
      _id: string;
      value: number;
    };

    export type TrackExtension = Track.Track & { genre: Track.Genre };
  }
}
