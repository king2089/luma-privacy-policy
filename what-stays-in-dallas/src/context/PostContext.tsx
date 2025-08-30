import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Post, Comment } from '../types';

interface PostContextType {
  posts: Post[];
  comments: Comment[];
  addPost: (post: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'isLiked'>) => void;
  likePost: (postId: string) => void;
  addComment: (comment: Omit<Comment, 'id' | 'timestamp'>) => void;
  getPostById: (id: string) => Post | undefined;
  getCommentsByPostId: (postId: string) => Comment[];
}

const PostContext = createContext<PostContextType | undefined>(undefined);

// Mock data for demo purposes
const MOCK_POSTS: Post[] = [
  {
    id: '1',
    userId: '1',
    username: 'dallas_native',
    userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    content: 'Another amazing sunset over Downtown Dallas! This city never fails to impress me 🌆 #DallasLife #Sunset',
    image: 'https://images.unsplash.com/photo-1571163584440-ddb88cfe3f6a?w=400&h=400&fit=crop',
    location: 'Downtown Dallas, TX',
    timestamp: Date.now() - 3600000,
    likes: 42,
    comments: 8,
    isLiked: false,
    hashtags: ['DallasLife', 'Sunset'],
  },
  {
    id: '2',
    userId: '2',
    username: 'texan_foodie',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'Best BBQ in Texas? Deep Ellum delivers every time! 🍖 #BBQ #DeepEllum #DallasEats',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop',
    location: 'Deep Ellum, Dallas',
    timestamp: Date.now() - 7200000,
    likes: 67,
    comments: 12,
    isLiked: true,
    hashtags: ['BBQ', 'DeepEllum', 'DallasEats'],
  },
  {
    id: '3',
    userId: '3',
    username: 'cowboy_fan',
    userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    content: 'Game day at AT&T Stadium! Cowboys vs Eagles tonight 🏈 #DallasCowboys #GameDay',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=400&fit=crop',
    location: 'AT&T Stadium, Arlington',
    timestamp: Date.now() - 10800000,
    likes: 156,
    comments: 34,
    isLiked: false,
    hashtags: ['DallasCowboys', 'GameDay'],
  },
];

const MOCK_COMMENTS: Comment[] = [
  {
    id: '1',
    postId: '1',
    userId: '2',
    username: 'texan_foodie',
    content: 'Amazing shot! Love the colors',
    timestamp: Date.now() - 3000000,
  },
  {
    id: '2',
    postId: '2',
    userId: '1',
    username: 'dallas_native',
    content: 'That brisket looks incredible!',
    timestamp: Date.now() - 6000000,
  },
];

export function PostProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [comments, setComments] = useState<Comment[]>(MOCK_COMMENTS);

  const addPost = (newPost: Omit<Post, 'id' | 'timestamp' | 'likes' | 'comments' | 'isLiked'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timestamp: Date.now(),
      likes: 0,
      comments: 0,
      isLiked: false,
    };
    setPosts(prev => [post, ...prev]);
  };

  const likePost = (postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
        };
      }
      return post;
    }));
  };

  const addComment = (newComment: Omit<Comment, 'id' | 'timestamp'>) => {
    const comment: Comment = {
      ...newComment,
      id: Date.now().toString(),
      timestamp: Date.now(),
    };
    setComments(prev => [...prev, comment]);
    
    // Update post comment count
    setPosts(prev => prev.map(post => {
      if (post.id === comment.postId) {
        return { ...post, comments: post.comments + 1 };
      }
      return post;
    }));
  };

  const getPostById = (id: string) => {
    return posts.find(post => post.id === id);
  };

  const getCommentsByPostId = (postId: string) => {
    return comments.filter(comment => comment.postId === postId);
  };

  const value = {
    posts,
    comments,
    addPost,
    likePost,
    addComment,
    getPostById,
    getCommentsByPostId,
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
}

export function usePosts() {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
}