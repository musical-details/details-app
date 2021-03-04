import { Request, Response } from "express";
export {};

declare global {
  export namespace Genre {
    /** ################################################ */
    /** ################################################ */
    /** @GetGenres */
    export namespace Req {
      export type GetGenresParams = {};

      export type GetGenresBody = {};

      export type GetGenresQuery = {};

      export type GetGenres = Request<
        GetGenresParams,
        any,
        GetGenresBody,
        GetGenresQuery
      >;
    }

    export namespace Res {
      export type GetGenresBodyPayload = {
        genres: Genre.Genre[];
      };

      export type GetGenresBodyError = {
        type: string;
      };

      export type GetGenresBody = System.ResponseBody<
        GetGenresBodyPayload,
        GetGenresBodyError
      >;

      export type GetGenres = Response<GetGenresBody>;
    }
  }
}
