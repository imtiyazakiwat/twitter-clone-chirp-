import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Tweet } from '../lib/supabase';

interface TweetState {
  tweets: Tweet[];
  loading: boolean;
  createTweet: (content: string, images?: string[]) => Promise<void>;
  deleteTweet: (id: string) => Promise<void>;
  loadTweets: () => Promise<void>;
  toggleLike: (tweetId: string) => Promise<void>;
  toggleRetweet: (tweetId: string) => Promise<void>;
}

export const useTweetStore = create<TweetState>((set, get) => ({
  tweets: [],
  loading: false,

  loadTweets: async () => {
    set({ loading: true });
    
    const { data, error } = await supabase
      .from('tweets')
      .select(`
        *,
        profile:profiles(*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error loading tweets:', error);
      set({ loading: false });
      return;
    }

    set({ tweets: data as Tweet[], loading: false });
  },

  createTweet: async (content: string, images?: string[]) => {
    const { data: tweet, error } = await supabase
      .from('tweets')
      .insert([{ content, images }])
      .select(`
        *,
        profile:profiles(*)
      `)
      .single();

    if (error) throw error;

    set((state) => ({
      tweets: [tweet as Tweet, ...state.tweets],
    }));
  },

  deleteTweet: async (id: string) => {
    const { error } = await supabase
      .from('tweets')
      .delete()
      .eq('id', id);

    if (error) throw error;

    set((state) => ({
      tweets: state.tweets.filter((tweet) => tweet.id !== id),
    }));
  },

  toggleLike: async (tweetId: string) => {
    const { tweets } = get();
    const tweet = tweets.find((t) => t.id === tweetId);
    
    if (!tweet) return;

    const newIsLiked = !tweet.is_liked;
    const newLikes = tweet.likes + (newIsLiked ? 1 : -1);

    set((state) => ({
      tweets: state.tweets.map((t) =>
        t.id === tweetId
          ? { ...t, is_liked: newIsLiked, likes: newLikes }
          : t
      ),
    }));

    const { error } = await supabase
      .from('tweet_likes')
      .upsert([
        {
          tweet_id: tweetId,
          liked: newIsLiked,
        },
      ]);

    if (error) throw error;
  },

  toggleRetweet: async (tweetId: string) => {
    const { tweets } = get();
    const tweet = tweets.find((t) => t.id === tweetId);
    
    if (!tweet) return;

    const newIsRetweeted = !tweet.is_retweeted;
    const newRetweets = tweet.retweets + (newIsRetweeted ? 1 : -1);

    set((state) => ({
      tweets: state.tweets.map((t) =>
        t.id === tweetId
          ? { ...t, is_retweeted: newIsRetweeted, retweets: newRetweets }
          : t
      ),
    }));

    const { error } = await supabase
      .from('tweet_retweets')
      .upsert([
        {
          tweet_id: tweetId,
          retweeted: newIsRetweeted,
        },
      ]);

    if (error) throw error;
  },
}));