import { useState, useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Text,
  Button,
  FlatList,
  Dimensions,
  RefreshControl
} from 'react-native';
import axios from 'axios';
import { Video } from 'expo-av';

const IMAGE_BASE_URL ='https://testapiappcore-g8g4apd7gdcfeybz.ukwest-01.azurewebsites.net/api/Image/';
const VIDEO_BASE_URL = 'https://testapiappcore-g8g4apd7gdcfeybz.ukwest-01.azurewebsites.net/api/Video/'

const ImageGallery = () => {
  const [mediaList, setMediaList] = useState([]);
  const [mediaType, setMediaType] = useState('image');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchMedia = async () => {
    setLoading(true);
    setError(null);
    try {

      const [imageResponse, videoResponse] = await Promise.all([
        axios.get(`${IMAGE_BASE_URL}GetAllImages`),
        axios.get(`${VIDEO_BASE_URL}GetAllVideos`)
      ])
     

      console.log('API Response:', imageResponse.data); 

      // Convert filenames into full URLs
      const images = imageResponse.data.map((filename) => ({
        uri: `${IMAGE_BASE_URL}${filename}`,
        type: 'image',
      }));

      const videos = videoResponse.data.map((filename) => ({
        uri: `${VIDEO_BASE_URL}${filename}`,
        type: 'video',
      }));

      const combined = [...images, ...videos];
      setMediaList(combined);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to fetch images');
      console.error('Error fetching images:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchMedia();
  };

  const toggleMediaType = () => {
    setMediaType((prev) => (prev === 'image' ? 'video' : 'image'));
  };

  const filteredMedia = mediaList.filter((item) => item.type === mediaType);

  const renderItem = ({ item }) => {
    return item.type === 'video' ? (
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        useNativeControls
        resizeMode="contain"
        isLooping
      />
    ) : (
      <Image
        source={{ uri: item.uri }}
        style={styles.image}
        resizeMode="contain"
      />
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={fetchMedia} />
      </View>
    );
  }

  if (filteredMedia.length === 0) {
    return (
      <View style={styles.center}>
        <Text>No {mediaType === 'image' ? 'Images' : 'Videos'} to Disply</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
    <View style={styles.toggleButton}>
    <Button title = {`Show ${mediaType === 'image' ? 'Videos' : 'Images'}`} onPress={toggleMediaType}/>
    </View>
    <FlatList
      contentContainerStyle={styles.list}
      data={filteredMedia}
      keyExtractor={(item, index) => `${item}-${index}`}
      renderItem={renderItem}

      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    />
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
    textAlign: 'center',
  },
  list: {
    padding: 8,
    alignItems: 'center',
  },
  toggleButton: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: Dimensions.get('window').width - 32,
    height: 300,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  video: {
    width: Dimensions.get('window').width - 32,
    height: 300,
    marginBottom: 12,
    borderRadius: 10,
    backgroundColor: '#000',
  },
});

export default ImageGallery;
