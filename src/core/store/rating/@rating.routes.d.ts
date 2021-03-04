import { Request, Response } from "express";
export {};

declare global {
  export namespace Rating {
    /** ################################################ */
    /** ################################################ */
    /** @GetRatings */
    export namespace Req {
      export type GetRatingsParams = {};

      export type GetRatingsBody = {};

      export type GetRatingsQuery = {};

      export type GetRatings = Request<
        GetRatingsParams,
        any,
        GetRatingsBody,
        GetRatingsQuery
      >;
    }

    export namespace Res {
      export type GetRatingsBodyPayload = {
        ratings: Rating.Rating[];
      };

      export type GetRatingsBodyError = {
        type: string;
      };

      export type GetRatingsBody = System.ResponseBody<
        GetRatingsBodyPayload,
        GetRatingsBodyError
      >;

      export type GetRatings = Response<GetRatingsBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetRating */
    export namespace Req {
      export type GetRatingParams = {
        ratingId: string;
      };

      export type GetRatingBody = {};

      export type GetRatingQuery = {};

      export type GetRating = Request<
        GetRatingParams,
        any,
        GetRatingBody,
        GetRatingQuery
      >;
    }

    export namespace Res {
      export type GetRatingBodyPayload = {
        rating: Rating.Rating;
      };

      export type GetRatingBodyError = {
        type: string;
      };

      export type GetRatingBody = System.ResponseBody<
        GetRatingBodyPayload,
        GetRatingBodyError
      >;

      export type GetRating = Response<GetRatingBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @PostRating */
    export namespace Req {
      export type PostRatingParams = {};

      export type PostRatingBody = {
        rating: {
          trackId: string;
        };
      };

      export type PostRatingQuery = {};

      export type PostRating = Request<
        PostRatingParams,
        any,
        GetRatingBody,
        GetRatingQuery
      >;
    }

    export namespace Res {
      export type PostRatingBodyPayload = {
        rating: Rating.Rating;
      };

      export type PostRatingBodyError = {
        type: string;
      };

      export type PostRatingBody = System.ResponseBody<
        PostRatingBodyPayload,
        PostRatingBodyError
      >;

      export type PostRating = Response<PostRatingBody>;
    }
  }
}
