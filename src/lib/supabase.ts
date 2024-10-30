import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-project.supabase.co';
const supabaseKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Profile = {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  bio: string;
  website: string;
  created_at: string;
};

export type Tweet = {
  id: string;
  content: string;
  user_id: string;
  created_at: string;
  profile: Profile;
  likes: number;
  retweets: number;
  replies: number;
  images?: string[];
  is_liked?: boolean;
  is_retweeted?: boolean;
};