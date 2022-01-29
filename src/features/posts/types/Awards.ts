export interface Awards {
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

interface Media {
  url: string;
  width: number;
  height: number;
}
