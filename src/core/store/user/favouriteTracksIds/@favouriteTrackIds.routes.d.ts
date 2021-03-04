import { Request, Response } from "express";
export {};

declare global {
  export namespace User {
    /** ################################################ */
    /** ################################################ */
    /** @GetFavouriteTrackIds */
    export namespace Req {
      export type GetFavouriteTrackIdsParams = {
        userId: string;
      };

      export type GetFavouriteTrackIdsBody = {};

      export type GetFavouriteTrackIdsQuery = {};

      export type GetFavouriteTrackIds = Request<
        GetFavouriteTrackIdsParams,
        any,
        GetFavouriteTrackIdsBody,
        GetFavouriteTrackIdsQuery
      > & { user: UserDocument };
    }

    export namespace Res {
      export type GetFavouriteTrackIdsBodyPayload = {
        favouriteTrackIds: string[];
      };

      export type GetFavouriteTrackIdsBodyError = {
        type: string;
      };

      export type GetFavouriteTrackIds = System.ResponseBody<
        GetFavouriteTrackIdsBodyPayload,
        GetFavouriteTrackIdsBodyError
      >;

      export type GetFavouriteTrackIds = Response<GetFavouriteTrackIdsBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @PostFavouriteTrackId */
    export namespace Req {
      export type PostFavouriteTrackIdParams = {
        userId: string;
      };

      export type PostFavouriteTrackIdBody = {
        favouriteTrackId: string;
      };

      export type PostFavouriteTrackIdQuery = {};

      export type PostFavouriteTrackId = Request<
        PostFavouriteTrackIdParams,
        any,
        PostFavouriteTrackIdBody,
        PostFavouriteTrackIdQuery
      > & { user: UserDocument };
    }

    export namespace Res {
      export type PostFavouriteTrackIdBodyPayload = {
        favouriteTrackId: string;
      };

      export type PostFavouriteTrackIdBodyError = {
        type: string;
      };

      export type PostFavouriteTrackId = System.ResponseBody<
        PostFavouriteTrackIdBodyPayload,
        PostFavouriteTrackIdBodyError
      >;

      export type GetFavouriteTrackIds = Response<GetFavouriteTrackIdsBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @DeleteFavouriteTrackId */
    export namespace Req {
      export type DeleteFavouriteTrackIdParams = {
        userId: string;
        favouriteTrackId: string;
      };

      export type DeleteFavouriteTrackIdBody = {};

      export type DeleteFavouriteTrackIdQuery = {};

      export type DeleteFavouriteTrackId = Request<
        DeleteFavouriteTrackIdParams,
        any,
        DeleteFavouriteTrackIdBody,
        DeleteFavouriteTrackIdQuery
      > & { user: UserDocument };
    }

    export namespace Res {
      export type DeleteFavouriteTrackIdBodyPayload = {
        favouriteTrackId: undefined;
      };

      export type DeleteFavouriteTrackIdBodyError = {
        type: string;
      };

      export type DeleteFavouriteTrackId = System.ResponseBody<
        DeleteFavouriteTrackIdBodyPayload,
        DeleteFavouriteTrackIdBodyError
      >;

      export type DeleteFavouriteTrackId = Response<DeleteFavouriteTrackIdBody>;
    }
  }
}
