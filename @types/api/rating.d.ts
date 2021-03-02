export {};
declare global {
  export namespace Rating {
    export interface Rating {
      _id: string;
      userId: string;
      trackId: string;
      moments: Rating.Moment[];
      createdAt: System.Timestamp;
      updatedAt: System.Timestamp;
    }

    export interface Moment {
      _id: string;
      name: string;
      description?: string;
      startTimestamp: System.Timestamp;
      endTimestamp: System.Timestamp;
      section: Rating.MomentSection;
      themeColor: Rating.MomentThemeColor;
      reactionType: Rating.ReactionType;
      createdAt: System.Timestamp;
      updatedAt: System.Timestamp;
    }

    export type MomentSection = 1 | 2 | 3 | 4 | 5;

    export type ReactionType =
      | "suprised_face"
      | "crying_face"
      | "pouting_face"
      | "love"
      | "laughing_face"
      | "thumb_up"
      | "thumb_down";

    export type MomentThemeColor =
      | "#202020"
      | "#5d238a"
      | "#283dc3"
      | "#38adae"
      | "#f85765"
      | "#f94922"
      | "#d12e71"
      | "#bc209b"
      | "#6a4ba2"
      | string;

    export type RatingExtension = Rating.Rating & {
      user: User.User | undefined;
      track: Track.Track | undefined;
    };
  }
}
