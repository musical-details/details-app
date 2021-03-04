import { Request, Response } from "express";
export {};

declare global {
  export namespace Rating {
    /** ################################################ */
    /** ################################################ */
    /** @GetMoments */
    export namespace Req {
      export type GetMomentsParams = {
        ratingId: string;
      };

      export type GetMomentsBody = {};

      export type GetMomentsQuery = {};

      export type GetMoments = Request<
        GetMomentsParams,
        any,
        GetMomentsBody,
        GetMomentsQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type GetMomentsBodyPayload = {
        moments: Rating.Moment[];
      };

      export type GetMomentsBodyError = {
        type: string;
      };

      export type GetMomentsBody = System.ResponseBody<
        GetMomentsBodyPayload,
        GetMomentsBodyError
      >;

      export type GetMoments = Response<GetMomentsBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetMomentById */
    export namespace Req {
      export type GetMomentByIdParams = {
        ratingId: string;
        momentId: string;
      };

      export type GetMomentByIdBody = {};

      export type GetMomentByIdQuery = {};

      export type GetMomentById = Request<
        GetMomentByIdParams,
        any,
        GetMomentByIdBody,
        GetMomentByIdQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type GetMomentByIdBodyPayload = {
        moment: Rating.Moment;
      };

      export type GetMomentByIdBodyError = {
        type: string;
      };

      export type GetMomentByIdBody = System.ResponseBody<
        GetMomentByIdBodyPayload,
        GetMomentByIdBodyError
      >;

      export type GetMomentById = Response<GetMomentByIdBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @PostMoment */
    export namespace Req {
      export type PostMomentParams = {
        ratingId: string;
        momentId: string;
      };

      export type PostMomentBody = {
        moment: Omit<Rating.Moment, "_id" | "createdAt" | "updatedAt">;
      };

      export type PostMomentQuery = {};

      export type PostMoment = Request<
        PostMomentParams,
        any,
        PostMomentBody,
        PostMomentQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type PostMomentBodyPayload = {
        moment: Rating.Moment;
      };

      export type PostMomentBodyError = {
        type: string;
      };

      export type PostMomentBody = System.ResponseBody<
        PostMomentBodyPayload,
        PostMomentBodyError
      >;

      export type PostMoment = Response<PostMomentBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @PutMoment */
    export namespace Req {
      export type PutMomentParams = {
        ratingId: string;
        momentId: string;
      };

      export type PutMomentBody = {
        moment: Parital<Omit<Rating.Moment, "createdAt" | "updatedAt">>;
      };

      export type PutMomentQuery = {};

      export type PutMoment = Request<
        PutMomentParams,
        any,
        PutMomentBody,
        PutMomentQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type PutMomentBodyPayload = {
        moment: Rating.Moment;
      };

      export type PutMomentBodyError = {
        type: string;
      };

      export type PutMomentBody = System.ResponseBody<
        PutMomentBodyPayload,
        PutMomentBodyError
      >;

      export type PutMoment = Response<PutMomentBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @PatchMoment */
    export namespace Req {
      export type PatchMomentParams = {
        ratingId: string;
        momentId: string;
      };

      export type PatchMomentBody = {
        moment: Partial<Omit<Rating.Moment, "createdAt" | "updatedAt">>;
      };

      export type PatchMomentQuery = {};

      export type PatchMoment = Request<
        PatchMomentParams,
        any,
        PatchMomentBody,
        PatchMomentQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type PatchMomentBodyPayload = {
        moment: Rating.Moment;
      };

      export type PatchMomentBodyError = {
        type: string;
      };

      export type PatchMomentBody = System.ResponseBody<
        PatchMomentBodyPayload,
        PatchMomentBodyError
      >;

      export type PatchMoment = Response<PatchMomentBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @DeleteMoment */
    export namespace Req {
      export type DeleteMomentParams = {
        ratingId: string;
        momentId: string;
      };

      export type DeleteMomentBody = {
        moment: Partial<Omit<Rating.Moment, "createdAt" | "updatedAt">>;
      };

      export type DeleteMomentQuery = {};

      export type DeleteMoment = Request<
        DeleteMomentParams,
        any,
        DeleteMomentBody,
        DeleteMomentQuery
      > & { rating: RatingDocument };
    }

    export namespace Res {
      export type DeleteMomentBodyPayload = {
        moment: Rating.Moment;
      };

      export type DeleteMomentBodyError = {
        type: string;
      };

      export type DeleteMomentBody = System.ResponseBody<
        DeleteMomentBodyPayload,
        DeleteMomentBodyError
      >;

      export type PatchMoment = Response<DeleteMomentBody>;
    }
  }
}
