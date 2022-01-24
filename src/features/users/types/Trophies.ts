export interface TrophiesRes {
  data: {
    trophies: Array<{
      data: Trophies;
    }>;
  };
}

export interface Trophies {
  icon_70: string;
  icon_40: string;
  granted_at: number;
  name: string;
  award_id: string;
}
