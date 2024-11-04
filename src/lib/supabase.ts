import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dpruymhjcskrritjujaw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRwcnV5bWhqY3NrcnJpdGp1amF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAyNzYyMTUsImV4cCI6MjA0NTg1MjIxNX0.S97kLw3QMVWSzTjZpvf2rQ0ER6zc4tKgXaiVstCZuUM';

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
