export interface PostsApiResponse {
  after: string;
  before?: string;
  dist: number;
  children: Array<{
    data: PostType;
  }>;
}

export interface PostType {
  approved_at_utc: null | number;
  subreddit: string;
  selftext: string;
  author_fullname: string;
  saved: boolean;
  mod_reason_title: null | string;
  gilded: number;
  clicked: boolean;
  title: string;
  link_flair_richtext: unknown;
  subreddit_name_prefixed: string;
  hidden: boolean;
  pwls: number;
  link_flair_css_class: string;
  downs: number;
  thumbnail_height: null | number;
  top_awarded_type: string;
  hide_score: boolean;
  name: string;
  quarantine: boolean;
  link_flair_text_color: 'dark' | 'light';
  upvote_ratio: number;
  author_flair_background_color: null | string;
  subreddit_type: string;
  ups: number;
  total_awards_received: number;
  media_embed: any;
  thumbnail_width: null | number;
  author_flair_template_id: null | string;
  is_original_content: boolean;
  user_reports: [];
  secure_media: null;
  is_reddit_media_domain: boolean;
  is_meta: boolean;
  category: null;
  secure_media_embed: any;
  link_flair_text: string;
  can_mod_post: boolean;
  score: number;
  approved_by: null | string;
  is_created_from_ads_ui: boolean;
  author_premium: boolean;
  thumbnail: string;
  edited: boolean;
  author_flair_css_class: null | string;
  author_flair_richtext: unknown;
  gildings: unknown;
  post_hint?: string;
  content_categories: null | string;
  is_self: boolean;
  mod_note: null | string;
  created: number;
  link_flair_type: string;
  wls: number;
  removed_by_category: null;
  banned_by: null | string;
  author_flair_type: string;
  domain: string;
  allow_live_comments: boolean;
  selftext_html: string;
  likes: null | boolean;
  suggested_sort: null;
  banned_at_utc: null;
  view_count: null | number;
  archived: boolean;
  no_follow: boolean;
  is_crosspostable: boolean;
  pinned: boolean;
  over_18: boolean;
  preview: PreviewDTO;
  all_awardings: Array<AwardsDTO>;
  awarders: unknown;
  media_only: boolean;
  link_flair_template_id: string;
  can_gild: boolean;
  spoiler: boolean;
  locked: boolean;
  author_flair_text: null | string;
  treatment_tags: unknown;
  visited: boolean;
  removed_by: null | string;
  num_reports: null | number;
  distinguished: null;
  subreddit_id: string;
  author_is_blocked: boolean;
  mod_reason_by: null | string;
  removal_reason: null | string;
  link_flair_background_color: string;
  id: string;
  is_robot_indexable: boolean;
  report_reasons: null;
  author: string;
  discussion_type: null;
  num_comments: number;
  send_replies: boolean;
  whitelist_status: string;
  contest_mode: boolean;
  mod_reports: unknown;
  author_patreon_flair: boolean;
  author_flair_text_color: null | string;
  permalink: string;
  parent_whitelist_status: string;
  stickied: boolean;
  url: string;
  subreddit_subscribers: number;
  created_utc: number;
  num_crossposts: number;
  media: null | MediaDto;
  is_video: boolean;
  is_gallery: boolean;
  media_metadata: any;
  gallery_data: {
    items: Array<{
      media_id: string;
      id: number;
    }>;
  };
  sr_detail: {
    community_icon: string;
    icon_img: string;
  };
}

export interface AwardsDTO {
  giver_coin_reward: null;
  subreddit_id: null | string;
  is_new: boolean;
  days_of_drip_extension: number;
  coin_price: number;
  id: string;
  penny_donate: null;
  award_sub_type: string;
  coin_reward: number;
  icon_url: string;
  days_of_premium: number;
  tiers_by_required_awardings: null;
  resized_icons: Array<Media>;
  icon_width: number;
  static_icon_width: number;
  start_date: null;
  is_enabled: boolean;
  awardings_required_to_grant_benefits: null;
  description: string;
  end_date: null;
  subreddit_coin_reward: number;
  count: number;
  static_icon_height: number;
  name: string;
  resized_static_icons: Array<Media>;
  icon_format: null;
  icon_height: number;
  penny_price: null;
  award_type: string;
  static_icon_url: string;
}

export interface PreviewDTO {
  images: Array<{
    source: Media;
    resolutions: Array<Media>;
    variants: {
      mp4: {
        source: Media;
        resolutions: Array<Media>;
      };
      obfuscated: {
        source: Media;
        resolutions: Array<Media>;
      };
    };
    id: string;
  }>;
  reddit_video_preview?: Video;
}

export interface MediaDto {
  oembed: Oembed;
  reddit_video: Video;
}

interface Media {
  url: string;
  width: number;
  height: number;
}

interface Video {
  bitrate_kbps: number;
  fallback_url: string;
  height: number;
  width: number;
  scrubber_media_url: string;
  dash_url: string;
  duration: number;
  hls_url: string;
  is_gif: boolean;
  transcoding_status: string;
}

interface Oembed {
  provider_url: string;
  version: string;
  title: string;
  type: string;
  thumbnail_width: number;
  width: number;
  height: number;
  author_name: string;
  provider_name: string;
  thumbnail_url: string;
  thumbnail_height: number;
}
