export {};
declare global {
  export namespace Api {
    export namespace User {
      export interface User {
        _id: string;
        login: string;
        password: string;
        profiles: User.Profile[];
        favouriteTracksIds: string[];
        photoUrl: string;
        backgroundPhotoUrl: string;
        backgroundColorTheme: string;
      }

      export interface Profile {
        _id: string;
        type: ProfileType;
      }

      export type ProfileType = "spotify" | "soundcloud";
    }
  }
}
