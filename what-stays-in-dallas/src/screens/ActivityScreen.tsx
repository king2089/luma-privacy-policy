import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ActivityItem {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'mention';
  user: {
    username: string;
    avatar: string;
  };
  timestamp: number;
  postImage?: string;
  content?: string;
}

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    type: 'like',
    user: {
      username: 'texan_foodie',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    timestamp: Date.now() - 1800000,
    postImage: 'https://images.unsplash.com/photo-1571163584440-ddb88cfe3f6a?w=100&h=100&fit=crop',
  },
  {
    id: '2',
    type: 'comment',
    user: {
      username: 'cowboy_fan',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    timestamp: Date.now() - 3600000,
    content: 'Amazing shot of downtown!',
    postImage: 'https://images.unsplash.com/photo-1571163584440-ddb88cfe3f6a?w=100&h=100&fit=crop',
  },
  {
    id: '3',
    type: 'follow',
    user: {
      username: 'dallas_photographer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    },
    timestamp: Date.now() - 7200000,
  },
  {
    id: '4',
    type: 'like',
    user: {
      username: 'deep_ellum_artist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    },
    timestamp: Date.now() - 10800000,
    postImage: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=100&h=100&fit=crop',
  },
  {
    id: '5',
    type: 'mention',
    user: {
      username: 'dallas_events',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
    timestamp: Date.now() - 14400000,
    content: 'Check out this awesome Deep Ellum spot!',
  },
];

export default function ActivityScreen() {
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

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'like':
        return <Ionicons name="heart" size={20} color="#FF6B35" />;
      case 'comment':
        return <Ionicons name="chatbubble" size={18} color="#2E4A62" />;
      case 'follow':
        return <Ionicons name="person-add" size={18} color="#2E4A62" />;
      case 'mention':
        return <Ionicons name="at" size={18} color="#2E4A62" />;
      default:
        return <Ionicons name="notifications" size={18} color="#666" />;
    }
  };

  const getActivityText = (item: ActivityItem) => {
    switch (item.type) {
      case 'like':
        return 'liked your post';
      case 'comment':
        return 'commented on your post';
      case 'follow':
        return 'started following you';
      case 'mention':
        return 'mentioned you in a post';
      default:
        return 'interacted with your content';
    }
  };

  const renderActivity = ({ item }: { item: ActivityItem }) => (
    <TouchableOpacity style={styles.activityItem}>
      <View style={styles.iconContainer}>
        {getActivityIcon(item.type)}
      </View>
      
      <Image source={{ uri: item.user.avatar }} style={styles.userAvatar} />
      
      <View style={styles.activityContent}>
        <Text style={styles.activityText}>
          <Text style={styles.username}>{item.user.username}</Text>
          {' '}{getActivityText(item)}
        </Text>
        
        {item.content && (
          <Text style={styles.commentText} numberOfLines={2}>
            "{item.content}"
          </Text>
        )}
        
        <Text style={styles.timestamp}>{formatTimeAgo(item.timestamp)}</Text>
      </View>
      
      {item.postImage && (
        <Image source={{ uri: item.postImage }} style={styles.postThumbnail} />
      )}
      
      {item.type === 'follow' && (
        <TouchableOpacity style={styles.followButton}>
          <Text style={styles.followButtonText}>Follow</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );

  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Activity</Text>
      <Text style={styles.headerSubtitle}>See who's been engaging with your content</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={MOCK_ACTIVITIES}
        renderItem={renderActivity}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={ListHeader}
        showsVerticalScrollIndicator={false}
        style={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  list: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A62',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  activityItem: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  iconContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: 14,
    color: '#2E4A62',
    lineHeight: 18,
  },
  username: {
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  postThumbnail: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginLeft: 10,
  },
  followButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});