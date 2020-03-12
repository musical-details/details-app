export const API_KEY = "wpfE1K2Teq4ZQ0QxdOuzIPTQUrcPO9P6";

/**
 * @link https://developers.soundcloud.com/docs/api/reference#tracks
 */
// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace SoundCloud {
  type TrackData = {
    id: number;
    created_at: any;
    user_id: number;
    duration: number;
    commentable: boolean;
    state: any;
    sharing: any;
    tag_list: any;
    permalink: any;
    description: any;
    streamable: boolean;
    downloadable: boolean;
    genre: any;
    release: any;
    purchase_url: any;
    label_id: any;
    label_name: any;
    isrc: any;
    video_url: any;
    track_type: any;
    key_signature: any;
    bpm: any;
    title: string;
    release_year: any;
    release_month: any;
    release_day: any;
    original_format: any;
    original_content_size: number;
    license: any;
    uri: string;
    permalink_url: string;
    artwork_url: any;
    waveform_url: string;
    user: {
      id: number;
      permalink: any;
      username: any;
      uri: string;
      permalink_url: string;
      avatar_url: string;
    };
    stream_url: string;
    download_url: string;
    playback_count: number;
    download_count: number;
    favoritings_count: number;
    comment_count: number;
    attachments_uri: string;
  };

  type UserFavouritesData = {
    kind: string;
    id: number;
    created_at: Date;
    user_id: number;
    duration: number;
    commentable: boolean;
    state: string;
    original_content_size: number;
    last_modified: Date;
    sharing: string;
    tag_list: string;
    permalink: string;
    streamable: boolean;
    embeddable_by: string;
    downloadable: boolean;
    purchase_url: string;
    label_id: number | null;
    purchase_title: string;
    genre: string;
    title: string;
    description: string;
    label_name: string | null;
    release: any | null;
    track_type: any | null;
    key_signature: any | null;
    isrc: any | null;
    video_url: any | null;
    bpm: number | null;
    release_year: number | null;
    release_month: number | null;
    release_day: number | null;
    original_format: string;
    license: string;
    uri: string;
    user: {
      id: number;
      kind: string;
      permalink: string;
      username: string;
      last_modified: Date;
    };
    permalink_url: string;
    artwork_url: string | null;
    waveform_url: string | null;
    stream_url: string | null;
    playback_count: number;
    download_count: number;
    favoritings_count: number;
    comment_count: number;
  };
}
