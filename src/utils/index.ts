import { ObjectID } from "bson";
import { Position, Pixels } from "../core/shared";
import { API_KEY, SoundCloud } from "../core/soundcloud";
import genresMock from "./../core/store/genre/genres.mock.json";

type Time = {
  signed: string;
  h?: string;
  m: string;
  s: string;
  ms: string;
};

export const random = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};

export const scrollTo = (ref: React.RefObject<any>): void => {
  window.scrollTo(0, ref.current.offsetTop);
};

export const convertToMMSSMS = (seconds: number): Time => {
  let m: number = Math.floor(Math.abs(seconds) / 60);
  seconds %= 60;
  let s: number = Math.floor(seconds);
  let ms: number = Math.floor(seconds * 1000) % 1000;
  ms = Math.abs(ms);

  return {
    signed: s < 0 ? `-` : ``,
    m: m < 10 ? `0${Math.abs(m)}` : `${m}`,
    s: Math.abs(s) < 10 ? `0${Math.abs(s)}` : `${Math.abs(s)}`,
    ms: ms < 100 ? (ms < 10 ? `00${ms}` : `0${ms}`) : `${ms}`,
  };
};

export const convertToSeconds = (m: number, s: number, ms: number): number => {
  let seconds: number = 0;
  seconds = m * 60 + s + ms / 1000;
  return seconds;
};

export const fetchFromApi = async (
  endpoint: string,
  data: {
    method: "GET" | "POST" | "DELETE" | "PUT";
    token?: string;
    body?: {};
  }
): Promise<any> => {
  const apiUrl: string = "https://localhost:8080/";
  const response: Response = await fetch(`${apiUrl}${endpoint}`, {
    method: data.method,
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${data.token}`,
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data.body),
  });
  return await response.json();
};

export const adjustPositionToScreen = (
  position: Position,
  size: { width: number; height: number }
): Position => {
  const { innerWidth, innerHeight } = window;
  return {
    x:
      position.x + size.width < innerWidth
        ? position.x
        : position.x - size.width,
    y:
      position.y + size.height < innerHeight
        ? position.y
        : position.y - size.height,
  };
};

export const findIdxById = <T extends { _id: string }>(
  array: T[],
  id: string
): number => {
  return array.findIndex((element) => element._id === id);
};

export const notEmpty = <TValue>(
  value: TValue | null | undefined
): value is TValue => {
  return value !== null && value !== undefined;
};

export const generateUsersMock = async (
  urls: Array<string> //
): Promise<User.User[]> => {
  const now = Date.now();

  return Promise.all(
    urls.map(async (url) => {
      const trackRes = await fetch(
        `https://api.soundcloud.com/resolve?url=${url}&client_id=${API_KEY}`
      );
      const trackResBody = await trackRes.json();
      return {
        _id: new ObjectID().toHexString(),
        connections: {
          soundCloudId: String(trackResBody.id),
        },
        email: {
          address: `${trackResBody.username}@gmail.com`,
          confirmedAt: now,
        },
        password:
          "$2y$12$9qWn28CtgGCpE4H4jt8kcOdGVzqx1Pc2o2TKAWo8DjivciIK2YapK",
        nickname: trackResBody.usernmae,
        favouriteTracksIds: [],
        lastSeenAt: now,
        createdAt: now,
        updatedAt: now,
        photoUrl: trackResBody.avatar_url,
        backgroundColorThemes: ["", ""] as [string, string],
      };
    })
  );
};

export const generateTracksMock = async (
  datas: Array<string> // soundCloudUrl
): Promise<Track.Track[]> => {
  const now = Date.now();
  const genres: Genre.Genre[] = genresMock;
  return Promise.all(
    datas.map(async (data) => {
      const trackRes = await fetch(
        `https://api.soundcloud.com/resolve?url=${data}&client_id=${API_KEY}`
      );
      const trackResBody: SoundCloud.UserFavouritesData = await trackRes.json();
      const genre: Genre.Genre | undefined = genres.find(
        (genre) => genre.name.toLowerCase() === trackResBody.genre.toLowerCase()
      );
      const timestamp: number = random(0, 0);
      return {
        _id: new ObjectID().toHexString(),
        sources: {
          soundCloudId: String(trackResBody.id),
        },
        genreIds: (genre && [genre._id]) || [],
        moodIds: [],
        audioUrl: `https://api.soundcloud.com/tracks/${trackResBody.id}/stream?client_id=${API_KEY}`,
        waveSticks: Array.from({ length: 200 }, () =>
          Math.floor(Math.random() * 100)
        ),
        artist: trackResBody.user.username,
        title: trackResBody.title,
        coverUrl: trackResBody.artwork_url || undefined,
        createdAt: random(1614784676 - 2592000000, 1614784676),
        updatedAt: random(1614784676, 1614784676),
      };
    })
  );
};
