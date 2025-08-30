import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Post } from '../types';

const { width } = Dimensions.get('window');

interface Props {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string) => void;
  onUserPress: (userId: string) => void;
}

export default function PostCard({ post, onLike, onComment, onUserPress }: Props) {
  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (days > 0) return `${days}d`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return 'now';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.userInfo}
          onPress={() => onUserPress(post.userId)}
        >
          <Image 
            source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }}
            style={styles.avatar}
          />
          <View style={styles.userDetails}>
            <Text style={styles.username}>{post.username}</Text>
            {post.location && (
              <Text style={styles.location}>{post.location}</Text>
            )}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.moreButton}>
          <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Post Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onLike(post.id)}
          >
            <Ionicons 
              name={post.isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={post.isLiked ? "#FF6B35" : "#666"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => onComment(post.id)}
          >
            <Ionicons name="chatbubble-outline" size={22} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="paper-plane-outline" size={22} color="#666" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity>
          <Ionicons name="bookmark-outline" size={22} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Likes and Comments Count */}
      <View style={styles.stats}>
        {post.likes > 0 && (
          <Text style={styles.likesText}>
            {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </Text>
        )}
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.contentText}>
          <Text style={styles.usernameInContent}>{post.username}</Text>{' '}
          {post.content}
        </Text>
        
        {post.comments > 0 && (
          <TouchableOpacity onPress={() => onComment(post.id)}>
            <Text style={styles.viewComments}>
              View all {post.comments} comments
            </Text>
          </TouchableOpacity>
        )}
        
        <Text style={styles.timestamp}>{formatTimeAgo(post.timestamp)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userDetails: {
    flex: 1,
  },
  username: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  location: {
    fontSize: 12,
    color: '#666',
    marginTop: 1,
  },
  moreButton: {
    padding: 5,
  },
  postImage: {
    width: width,
    height: width,
    resizeMode: 'cover',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
  stats: {
    paddingHorizontal: 15,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  content: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
  contentText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#2E4A62',
    marginTop: 5,
  },
  usernameInContent: {
    fontWeight: 'bold',
  },
  viewComments: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
    marginTop: 5,
    textTransform: 'uppercase',
  },
});