export {};
declare global {
  export namespace Api {
    export namespace Track {
      export interface Track {
        _id: string;
        audioUrl: string;
        title: string;
        artist: string;
        coverUrl: string;
      }
    }
  }
}
