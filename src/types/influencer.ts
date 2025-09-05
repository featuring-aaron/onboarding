export interface Influencer {
  pk: string;
  username: string;
  full_name: string;
  account_link: string;
  profile_img_link: string;
  follower: number;
  real_follower: number;
  avg_feed_like: number;
  avg_reach: number;
  real_engagement: number;
  main_audience_gender: 'F' | 'M' | null;
  main_audience_age_range: string | null;
  is_verified: boolean;
}
