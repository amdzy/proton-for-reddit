import { Awards } from '@/features/posts/types';

export interface Comment {
  children: any;
  count: number;
  profile_img: string;
  subreddit_id: string;
  approved_at_utc: null | string;
  author_is_blocked: boolean;
  comment_type: null;
  awarders: unknown;
  mod_reason_by: null | string;
  banned_by: null | string;
  author_flair_type: string;
  total_awards_received: number;
  subreddit: string;
  author_flair_template_id: null | string;
  likes: null | boolean;
  replies: Replies;
  user_reports: any[];
  saved: boolean;
  id: string;
  banned_at_utc: null | number;
  mod_reason_title: null | string;
  gilded: number;
  archived: boolean;
  collapsed_reason_code: null | string;
  no_follow: boolean;
  author: string;
  can_mod_post: boolean;
  created_utc: number;
  send_replies: boolean;
  parent_id: string;
  score: number;
  author_fullname: string;
  approved_by: string | null;
  mod_note: string | null;
  all_awardings: Array<Awards>;
  collapsed: boolean;
  body: string;
  edited: boolean;
  top_awarded_type: string | null;
  author_flair_css_class: string | null;
  name: string;
  is_submitter: boolean;
  downs: number;
  author_flair_richtext: Array<Flairs>;
  author_patreon_flair: boolean;
  body_html: string;
  removal_reason: string | null;
  collapsed_reason: string | null;
  distinguished: string | null;
  associated_award: string | null;
  stickied: boolean;
  author_premium: boolean;
  can_gild: boolean;
  gildings: any;
  unrepliable_reason: string | null;
  author_flair_text_color: string | null;
  score_hidden: boolean;
  permalink: string;
  subreddit_type: string;
  locked: boolean;
  report_reasons: null | string;
  created: number;
  author_flair_text: string | null;
  treatment_tags: any[];
  link_id: string;
  subreddit_name_prefixed: string;
  controversiality: number;
  depth: number;
  author_flair_background_color: null | string;
  collapsed_because_crowd_control: null | boolean;
  mod_reports: any[];
  num_reports: null | number;
  ups: number;
}

interface Replies {
  kind: 'Listing' | 't1' | 'more';
  data: {
    children: Array<{
      kind: 't1' | 'more';
      data: Comment;
    }>;
  };
}

interface Flairs {
  a: string;
  u: string;
  e: string;
}
