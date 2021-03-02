export {};
declare global {
  export namespace Genre {
    export type GenreId = string;

    export interface Genre {
      _id: Genre.GenreId;
      name: string;
      createdAt: System.Timestamp;
      updatedAt: System.Timestamp;
      group?: string;
    }
  }
}
