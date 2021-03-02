export {};
declare global {
  export namespace User {
    export type UserId = string;

    export interface User {
      _id: User.UserId;
      connections: User.Connections;
      email: User.Email;
      password: string;
      nickname: string;
      favouriteTracksIds: string[];
      lastSeenAt: System.Timestamp;
      createdAt: System.Timestamp;
      updatedAt: System.Timestamp;
      photoUrl?: string;
      backgroundPhotoUrl?: string;
      backgroundColorThemes?: [string, string];
    }

    export type UserExtension = User.User & {
      favouriteTracks: Track.Track[];
      ratings: Rating.Rating[];
    };

    export interface Connections {
      _id: string;
      soundCloudId?: string;
      spotifyId?: string;
    }

    export type Email = {
      address: string;
      confirmedAt?: System.Timestamp;
    };
  }
}
