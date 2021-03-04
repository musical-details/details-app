import { Request, Response } from "express";
export {};

declare global {
  export namespace User {
    /** ################################################ */
    /** ################################################ */
    /** @GetUsers */
    export namespace Req {
      export type GetUsersParams = {};

      export type GetUsersBody = {};

      export type GetUsersQuery = {};

      export type GetUsers = Request<
        GetUsersParams,
        any,
        GetUsersBody,
        GetUsersQuery
      >;
    }

    export namespace Res {
      export type GetUsersBodyPayload = {
        users: User.User[];
      };

      export type GetUsersBodyError = {
        type: string;
      };

      export type GetUsersBody = System.ResponseBody<
        GetUsersBodyPayload,
        GetUsersBodyError
      >;

      export type GetUsers = Response<GetUsersBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetUser */
    export namespace Req {
      export type GetUserParams = {
        userId: string;
      };

      export type GetUserBody = {};

      export type GetUserQuery = {};

      export type GetUser = Request<
        GetUserParams,
        any,
        GetUserBody,
        GetUserQuery
      >;
    }

    export namespace Res {
      export type GetUserBodyPayload = {
        user: User.User;
      };

      export type GetUserBodyError = {
        type: string;
      };

      export type GetUserBody = System.ResponseBody<
        GetUserBodyPayload,
        GetUserBodyError
      >;

      export type GetUser = Response<GetUserBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetUser */
    export namespace Req {
      export type GetCurrentUserParams = {};

      export type GetCurrentUserBody = {};

      export type GetCurrentUserQuery = {};

      export type GetCurrentUser = Request<
        GetCurrentUserParams,
        any,
        GetCurrentUserBody,
        GetCurrentUserQuery
      >;
    }

    export namespace Res {
      export type GetCurrentUserBodyPayload = {
        currentUser: User.User;
      };

      export type GetCurrentUserBodyError = {
        type: string;
      };

      export type GetCurrentUserBody = System.ResponseBody<
        GetCurrentUserBodyPayload,
        GetCurrentUserBodyError
      >;

      export type GetCurrentUser = Response<GetCurrentUserBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @RegisterUser */
    export namespace Req {
      export type RegisterUserParams = {};

      export type RegisterUserBody = {
        user: {
          emailAddress: string;
          password: string;
        };
      };

      export type RegisterUserQuery = {};

      export type RegisterUser = Request<
        RegisterUserParams,
        any,
        GetUserBody,
        GetUserQuery
      >;
    }

    export namespace Res {
      export type RegisterUserBodyPayload = {
        user: User.User;
      };

      export type RegisterUserBodyError = {
        type: string;
      };

      export type RegisterUserBody = System.ResponseBody<
        RegisterUserBodyPayload,
        RegisterUserBodyError
      >;

      export type RegisterUser = Response<RegisterUserBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @LoginUser */
    export namespace Req {
      export type LoginUserParams = {};

      export type LoginUserBody = {
        user: {
          emailAddress: string;
          password: string;
        };
      };

      export type LoginUserQuery = {};

      export type LoginUser = Request<
        LoginUserParams,
        any,
        LoginUserBody,
        LoginUserQuery
      >;
    }

    export namespace Res {
      export type LoginUserBodyPayload = {
        user: User.User;
      };

      export type LoginUserBodyError = {
        type: string;
      };

      export type LoginUserBody = System.ResponseBody<
        LoginUserBodyPayload,
        LoginUserBodyError
      >;

      export type LoginUser = Response<LoginUserBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @LogoutUser */
    export namespace Req {
      export type LogoutUserParams = {};

      export type LogoutUserBody = {};

      export type LogoutUserQuery = {};

      export type LogoutUser = Request<
        LogoutUserParams,
        any,
        LogoutUserBody,
        LogoutUserQuery
      >;
    }

    export namespace Res {
      export type LogoutUserBodyPayload = {
        currentUser: undefined;
      };

      export type LogoutUserBodyError = {
        type: string;
      };

      export type LogoutUserBody = System.ResponseBody<
        LogoutUserBodyPayload,
        LogoutUserBodyError
      >;

      export type LogoutUser = Response<LogoutUserBody>;
    }
  }
}
