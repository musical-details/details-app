export {};
declare global {
  export namespace Rating {
    export interface Rating {
      _id: string;
      userId: string;
      trackId: string;
      moments: Rating.Moment[];
    }

    export interface Moment {
      _id: string;
      name: string;
      description: string;
      startTimestamp: number;
      endTimestamp: number;
      section: Rating.MomentSection;
      themeColor: string;
      reactionType: Rating.ReactionType;
    }

    export type MomentSection = 1 | 2 | 3 | 4 | 5;

    export type ReactionType = ""; // TODO
  }
}
