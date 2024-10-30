export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
}

export interface Tweet {
  id: string;
  content: string;
  user: User;
  timestamp: Date;
  likes: number;
  retweets: number;
  replies: number;
  images?: string[];
  isLiked?: boolean;
  isRetweeted?: boolean;
}