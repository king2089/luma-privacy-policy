import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RouteProp, useRoute } from '@react-navigation/native';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import { RootStackParamList, Comment } from '../types';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

export default function PostDetailScreen() {
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;
  const { getPostById, getCommentsByPostId, addComment, likePost } = usePosts();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');

  const post = getPostById(postId);
  const comments = getCommentsByPostId(postId);

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Post not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddComment = () => {
    if (!newComment.trim() || !user) return;

    addComment({
      postId,
      userId: user.id,
      username: user.username,
      content: newComment.trim(),
    });

    setNewComment('');
  };

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

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentItem}>
      <Image 
        source={{ uri: 'https://via.placeholder.com/32' }}
        style={styles.commentAvatar}
      />
      <View style={styles.commentContent}>
        <Text style={styles.commentText}>
          <Text style={styles.commentUsername}>{item.username}</Text>
          {' '}{item.content}
        </Text>
        <Text style={styles.commentTime}>{formatTimeAgo(item.timestamp)}</Text>
      </View>
    </View>
  );

  const PostHeader = () => (
    <View>
      {/* Post Header */}
      <View style={styles.postHeader}>
        <Image 
          source={{ uri: post.userAvatar || 'https://via.placeholder.com/40' }}
          style={styles.postAvatar}
        />
        <View style={styles.postUserInfo}>
          <Text style={styles.postUsername}>{post.username}</Text>
          {post.location && (
            <Text style={styles.postLocation}>{post.location}</Text>
          )}
        </View>
      </View>

      {/* Post Image */}
      {post.image && (
        <Image source={{ uri: post.image }} style={styles.postImage} />
      )}

      {/* Post Actions */}
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => likePost(post.id)}
          >
            <Ionicons 
              name={post.isLiked ? "heart" : "heart-outline"} 
              size={24} 
              color={post.isLiked ? "#FF6B35" : "#666"} 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
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

      {/* Post Stats */}
      <View style={styles.postStats}>
        {post.likes > 0 && (
          <Text style={styles.likesText}>
            {post.likes} {post.likes === 1 ? 'like' : 'likes'}
          </Text>
        )}
      </View>

      {/* Post Content */}
      <View style={styles.postContent}>
        <Text style={styles.contentText}>
          <Text style={styles.usernameInContent}>{post.username}</Text>
          {' '}{post.content}
        </Text>
        <Text style={styles.postTime}>{formatTimeAgo(post.timestamp)}</Text>
      </View>

      {/* Comments Header */}
      <View style={styles.commentsHeader}>
        <Text style={styles.commentsTitle}>Comments</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <FlatList
          data={comments}
          renderItem={renderComment}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={PostHeader}
          showsVerticalScrollIndicator={false}
          style={styles.list}
        />

        <View style={styles.commentInputContainer}>
          <Image 
            source={{ uri: user?.avatar || 'https://via.placeholder.com/32' }}
            style={styles.inputAvatar}
          />
          <TextInput
            style={styles.commentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
            placeholderTextColor="#999"
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendButton, !newComment.trim() && styles.sendButtonDisabled]}
            onPress={handleAddComment}
            disabled={!newComment.trim()}
          >
            <Ionicons name="send" size={20} color={newComment.trim() ? "#FF6B35" : "#CCC"} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardView: {
    flex: 1,
  },
  list: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postUserInfo: {
    flex: 1,
  },
  postUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  postLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 1,
  },
  postImage: {
    width: '100%',
    aspectRatio: 1,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  leftActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    marginRight: 15,
  },
  postStats: {
    paddingHorizontal: 15,
  },
  likesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  postContent: {
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
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
  postTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 8,
    textTransform: 'uppercase',
  },
  commentsHeader: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  commentItem: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#F0F0F0',
  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentText: {
    fontSize: 14,
    lineHeight: 18,
    color: '#2E4A62',
  },
  commentUsername: {
    fontWeight: 'bold',
  },
  commentTime: {
    fontSize: 11,
    color: '#999',
    marginTop: 4,
  },
  commentInputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  inputAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    maxHeight: 80,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    fontSize: 14,
    color: '#2E4A62',
  },
  sendButton: {
    marginLeft: 12,
    padding: 8,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});