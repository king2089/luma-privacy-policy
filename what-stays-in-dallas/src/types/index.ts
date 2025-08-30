// Type definitions for the app

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
  followers: number;
  following: number;
  posts: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar?: string;
  content: string;
  image?: string;
  location?: string;
  timestamp: number;
  likes: number;
  comments: number;
  isLiked: boolean;
  hashtags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  username: string;
  content: string;
  timestamp: number;
}

export type RootStackParamList = {
  Main: undefined;
  Login: undefined;
  Register: undefined;
  PostDetail: { postId: string };
  Profile: { userId: string };
  CreatePost: undefined;
  EditProfile: undefined;
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Create: undefined;
  Activity: undefined;
  Profile: undefined;
};