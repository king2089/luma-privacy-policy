import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePosts } from '../context/PostContext';

const TRENDING_HASHTAGS = [
  '#DallasLife',
  '#DeepEllum', 
  '#DallasCowboys',
  '#BBQ',
  '#DallasEats',
  '#Downtown',
  '#TexasState',
  '#BigD',
  '#DallasArt',
  '#DallasNights',
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const { posts } = usePosts();

  const handleSearch = (text: string) => {
    setSearchText(text);
    if (text.trim()) {
      // Filter posts by content, hashtags, or username
      const results = posts.filter(post => 
        post.content.toLowerCase().includes(text.toLowerCase()) ||
        post.username.toLowerCase().includes(text.toLowerCase()) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(text.toLowerCase()))
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const renderHashtag = ({ item }: { item: string }) => (
    <TouchableOpacity 
      style={styles.hashtagItem}
      onPress={() => handleSearch(item)}
    >
      <Text style={styles.hashtagText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSearchResult = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.resultItem}>
      <Image source={{ uri: item.image }} style={styles.resultImage} />
      <View style={styles.resultContent}>
        <Text style={styles.resultUsername}>{item.username}</Text>
        <Text style={styles.resultText} numberOfLines={2}>
          {item.content}
        </Text>
        <Text style={styles.resultStats}>
          {item.likes} likes • {item.comments} comments
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Dallas</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search posts, people, hashtags..."
            value={searchText}
            onChangeText={handleSearch}
            placeholderTextColor="#999"
          />
          {searchText ? (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>

      {searchResults.length > 0 ? (
        <FlatList
          data={searchResults}
          renderItem={renderSearchResult}
          keyExtractor={(item) => item.id}
          style={styles.resultsList}
        />
      ) : (
        <View style={styles.exploreContent}>
          <View style={styles.trendingSection}>
            <Text style={styles.sectionTitle}>Trending in Dallas</Text>
            <FlatList
              data={TRENDING_HASHTAGS}
              renderItem={renderHashtag}
              keyExtractor={(item) => item}
              numColumns={2}
              scrollEnabled={false}
            />
          </View>

          <View style={styles.discoverSection}>
            <Text style={styles.sectionTitle}>Discover</Text>
            <View style={styles.discoverGrid}>
              <TouchableOpacity style={[styles.discoverItem, { backgroundColor: '#FF6B35' }]}>
                <Ionicons name="restaurant" size={30} color="#FFFFFF" />
                <Text style={styles.discoverText}>Food & Drinks</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.discoverItem, { backgroundColor: '#2E4A62' }]}>
                <Ionicons name="camera" size={30} color="#FFFFFF" />
                <Text style={styles.discoverText}>Photography</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.discoverItem, { backgroundColor: '#8A2BE2' }]}>
                <Ionicons name="musical-notes" size={30} color="#FFFFFF" />
                <Text style={styles.discoverText}>Nightlife</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.discoverItem, { backgroundColor: '#228B22' }]}>
                <Ionicons name="leaf" size={30} color="#FFFFFF" />
                <Text style={styles.discoverText}>Parks & Nature</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E4A62',
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingBottom: 15,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#2E4A62',
  },
  exploreContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  trendingSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E4A62',
    marginBottom: 15,
  },
  hashtagItem: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
    flex: 0.48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  hashtagText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: 'bold',
  },
  discoverSection: {
    marginTop: 30,
  },
  discoverGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  discoverItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  discoverText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
    textAlign: 'center',
  },
  resultsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  resultItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  resultContent: {
    flex: 1,
  },
  resultUsername: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4A62',
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  resultStats: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
});