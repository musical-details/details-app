import { Request, Response } from "express";
export {};

declare global {
  export namespace User {
    /** ################################################ */
    /** ################################################ */
    /** @GetUserConnections */
    export namespace Req {
      export type GetUserConnectionsParams = {
        userId: string;
      };

      export type GetUserConnectionsBody = {};

      export type GetUserConnectionsQuery = {};

      export type GetUserConnections = Request<
        GetUserConnectionsParams,
        any,
        GetUserConnectionsBody,
        GetUserConnectionsQuery
      > & { user: UserDocument };
    }

    export namespace Res {
      export type GetUserConnectionsBodyPayload = {
        connections: User.Connections;
      };

      export type GetUserConnectionsBodyError = {
        type: string;
      };

      export type GetUserConnectionsBody = System.ResponseBody<
        GetUserConnectionsBodyPayload,
        GetUserConnectionsBodyError
      >;

      export type GetUserConnections = Response<GetUserConnectionsBody>;
    }
  }
}
