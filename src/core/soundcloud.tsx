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
}
