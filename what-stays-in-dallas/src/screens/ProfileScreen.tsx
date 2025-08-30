import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

const { width } = Dimensions.get('window');
const ITEM_SIZE = (width - 60) / 3;

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const { posts } = usePosts();

  // Filter posts by current user
  const userPosts = posts.filter(post => post.userId === user?.id);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ]
    );
  };

  const handleEditProfile = () => {
    // Navigate to edit profile screen
    Alert.alert('Coming Soon', 'Profile editing will be available soon!');
  };

  const renderPost = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.postItem}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postOverlay}>
        <View style={styles.postStats}>
          <Ionicons name="heart" size={16} color="#FFFFFF" />
          <Text style={styles.postStatText}>{item.likes}</Text>
          <Ionicons name="chatbubble" size={16} color="#FFFFFF" style={{ marginLeft: 10 }} />
          <Text style={styles.postStatText}>{item.comments}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Image 
          source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }}
          style={styles.profileAvatar}
        />
        <TouchableOpacity style={styles.editAvatarButton}>
          <Ionicons name="camera" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <Text style={styles.displayName}>{user?.username}</Text>
      {user?.bio && <Text style={styles.bio}>{user.bio}</Text>}

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{userPosts.length}</Text>
          <Text style={styles.statLabel}>Posts</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.followers || 0}</Text>
          <Text style={styles.statLabel}>Followers</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{user?.following || 0}</Text>
          <Text style={styles.statLabel}>Following</Text>
        </View>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Ionicons name="person-circle-outline" size={18} color="#2E4A62" />
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={18} color="#FF6B35" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Ionicons name="grid-outline" size={20} color="#FF6B35" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="heart-outline" size={20} color="#666" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Ionicons name="bookmark-outline" size={20} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const EmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="camera-outline" size={80} color="#E0E0E0" />
      <Text style={styles.emptyTitle}>No Posts Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start sharing your Dallas moments!
      </Text>
      <TouchableOpacity style={styles.createPostButton}>
        <Text style={styles.createPostButtonText}>Create Your First Post</Text>
      </TouchableOpacity>
    </View>
  );

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Please log in to view your profile</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={userPosts}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        numColumns={3}
        ListHeaderComponent={ProfileHeader}
        ListEmptyComponent={userPosts.length === 0 ? EmptyState : null}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        contentContainerStyle={userPosts.length === 0 ? styles.emptyContainer : undefined}
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
  emptyContainer: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FF6B35',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FF6B35',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  displayName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E4A62',
    marginBottom: 5,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 25,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 25,
  },
  editButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 10,
  },
  editButtonText: {
    color: '#2E4A62',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  logoutButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0ED',
    paddingVertical: 12,
    borderRadius: 8,
    marginLeft: 10,
  },
  logoutButtonText: {
    color: '#FF6B35',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  tabContainer: {
    flexDirection: 'row',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 15,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  postItem: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  postImage: {
    width: '100%',
    height: '100%',
  },
  postOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0,
  },
  postStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postStatText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A62',
    marginTop: 20,
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  createPostButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  createPostButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
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
});