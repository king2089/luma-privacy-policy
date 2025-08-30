import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';

export default function CreatePostScreen() {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [location, setLocation] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const { addPost } = usePosts();
  const { user } = useAuth();

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera roll permissions to upload images.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera permissions to take photos.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const extractHashtags = (text: string): string[] => {
    const hashtagRegex = /#[\w]+/g;
    const matches = text.match(hashtagRegex);
    return matches ? matches.map(tag => tag.substring(1)) : [];
  };

  const handlePost = () => {
    if (!content.trim() && !selectedImage) {
      Alert.alert('Error', 'Please add some content or an image to post.');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to post.');
      return;
    }

    setIsPosting(true);

    const hashtags = extractHashtags(content);

    const newPost = {
      userId: user.id,
      username: user.username,
      userAvatar: user.avatar,
      content: content.trim(),
      image: selectedImage || undefined,
      location: location.trim() || undefined,
      hashtags,
    };

    addPost(newPost);

    // Reset form
    setContent('');
    setSelectedImage(null);
    setLocation('');
    setIsPosting(false);

    Alert.alert('Success', 'Your post has been shared!');
  };

  const showImagePicker = () => {
    Alert.alert(
      'Select Image',
      'Choose how you want to add an image',
      [
        { text: 'Camera', onPress: takePhoto },
        { text: 'Photo Library', onPress: pickImage },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Share Your Dallas Moment</Text>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.userInfo}>
            <Image 
              source={{ uri: user?.avatar || 'https://via.placeholder.com/50' }}
              style={styles.avatar}
            />
            <Text style={styles.username}>{user?.username}</Text>
          </View>

          <TextInput
            style={styles.contentInput}
            placeholder="What's happening in Dallas?"
            multiline
            value={content}
            onChangeText={setContent}
            placeholderTextColor="#999"
            textAlignVertical="top"
          />

          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
              <TouchableOpacity 
                style={styles.removeImageButton}
                onPress={() => setSelectedImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#666" />
            <TextInput
              style={styles.locationInput}
              placeholder="Add location (optional)"
              value={location}
              onChangeText={setLocation}
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity style={styles.actionButton} onPress={showImagePicker}>
              <Ionicons name="camera" size={24} color="#FF6B35" />
              <Text style={styles.actionText}>Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="pricetag" size={24} color="#FF6B35" />
              <Text style={styles.actionText}>Tag People</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="musical-note" size={24} color="#FF6B35" />
              <Text style={styles.actionText}>Music</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.hashtagSuggestions}>
            <Text style={styles.suggestionsTitle}>Popular in Dallas:</Text>
            <View style={styles.hashtagRow}>
              {['#DallasLife', '#DeepEllum', '#DallasEats'].map((hashtag) => (
                <TouchableOpacity 
                  key={hashtag}
                  style={styles.hashtagSuggestion}
                  onPress={() => setContent(prev => prev + ' ' + hashtag)}
                >
                  <Text style={styles.hashtagText}>{hashtag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <TouchableOpacity 
            style={[styles.postButton, isPosting && styles.disabledButton]}
            onPress={handlePost}
            disabled={isPosting}
          >
            <Text style={styles.postButtonText}>
              {isPosting ? 'Posting...' : 'Share Post'}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4A62',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  contentInput: {
    fontSize: 16,
    color: '#2E4A62',
    minHeight: 120,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  imageContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  selectedImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 20,
  },
  locationInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E4A62',
    marginLeft: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 15,
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  hashtagSuggestions: {
    marginBottom: 20,
  },
  suggestionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 10,
  },
  hashtagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hashtagSuggestion: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 8,
  },
  hashtagText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  postButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: 'center',
  },
  disabledButton: {
    opacity: 0.6,
  },
  postButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});