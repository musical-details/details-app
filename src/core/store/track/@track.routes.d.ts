import { Request, Response } from "express";
export {};

declare global {
  export namespace Track {
    /** ################################################ */
    /** ################################################ */
    /** @GetRatings */
    export namespace Req {
      export type GetTracksParams = {};

      export type GetTracksBody = {};

      export type GetTracksQuery = {};

      export type GetTracks = Request<
        GetTracksParams,
        any,
        GetTracksBody,
        GetTracksQuery
      >;
    }

    export namespace Res {
      export type GetTracksBodyPayload = {
        tracks: Track.Track[];
      };

      export type GetTracksBodyError = {
        type: string;
      };

      export type GetTracksBody = System.ResponseBody<
        GetTracksBodyPayload,
        GetTracksBodyError
      >;

      export type GetTracks = Response<GetTracksBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetTrackById */
    export namespace Req {
      export type GetTrackByIdParams = {
        trackId: string;
      };

      export type GetTrackByIdBody = {};

      export type GetTrackByIdQuery = {};

      export type GetTrackById = Request<
        GetTrackByIdParams,
        any,
        GetTrackByIdBody,
        GetTrackByIdQuery
      >;
    }

    export namespace Res {
      export type GetTrackByIdBodyPayload = {
        track: Track.Track;
      };

      export type GetTrackByIdBodyError = {
        type: string;
      };

      export type GetTrackById = System.ResponseBody<
        GetTrackByIdBodyPayload,
        GetTrackByIdBodyError
      >;

      export type GetTrackById = Response<GetTrackByIdBody>;
    }

    /** ################################################ */
    /** ################################################ */
    /** @GetTrackBySoundCloudUrl */
    export namespace Req {
      export type GetTrackBySoundCloudUrlParams = {
        soundCloudUrl: string;
      };

      export type GetTrackBySoundCloudUrlBody = {};

      export type GetTrackBySoundCloudUrlQuery = {};

      export type GetTrackBySoundCloudUrl = Request<
        GetTrackBySoundCloudUrlParams,
        any,
        GetTrackBySoundCloudUrlBody,
        GetTrackBySoundCloudUrlQuery
      >;
    }

    export namespace Res {
      export type GetTrackBySoundCloudUrlBodyPayload = {
        track: Track.Track;
      };

      export type GetTrackBySoundCloudUrlBodyError = {
        type: string;
      };

      export type GetTrackBySoundCloudUrl = System.ResponseBody<
        GetTrackBySoundCloudUrlBodyPayload,
        GetTrackBySoundCloudUrlBodyError
      >;

      export type GetTrackBySoundCloudUrl = Response<
        GetTrackBySoundCloudUrlBody
      >;
    }
  }
}
