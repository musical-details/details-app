export {};
declare global {
  export namespace User {
    export interface User {
      _id: string;
      login: string;
      password: string;
      profiles: User.Profiles;
      favouriteTracksIds: string[];
      photoUrl: string;
      backgroundPhotoUrl: string;
      backgroundColorTheme: string;
      _created_at: System.Timestamp;
      _updated_at: System.Timestamp;
    }

    export interface Profiles {
      _id: string;
      soundCloud?: User.SoundCloudProfile;
      spotify?: User.SpotifyProfile;
    }

    export type SoundCloudProfile = {
      _id: string;
      nickname: string;
      token: string; // TODO
    };

    export type SpotifyProfile = {
      _id: string; // TODO
    };
  }
}
