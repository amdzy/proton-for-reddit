export interface SubModeratedRes {
  data: Array<SubModerated>;
}

export interface SubModerated {
  banner_img: string;
  community_icon: string;
  display_name: string;
  title: string;
  over_18: boolean;

  primary_color: string;
  icon_img: string;
  display_name_prefixed: string;
  sr_display_name_prefixed: string;
  subscribers: number;
  whitelist_status: string;
  subreddit_type: string;
  key_color: string;
  name: string;
  created: number;
  url: string;
  sr: string;
  created_utc: number;
  banner_size: null;
}
