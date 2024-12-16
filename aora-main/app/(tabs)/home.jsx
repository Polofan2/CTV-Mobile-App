import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, Image, RefreshControl, Text, View } from "react-native";

import { images } from "../../constants";
import { EmptyState, SearchInput, Trending, VideoCard } from "../../components";

// Example of a mock function to simulate fetching posts
const fetchPosts = async () => {
  // Replace with your actual API call logic
  return [
    {
      $id: "1",
      title: "Sample Video 1",
      thumbnail: "https://example.com/thumbnail1.jpg",
      video: "https://example.com/video1.mp4",
      creator: { username: "User1", avatar: "https://example.com/avatar1.jpg" }
    },
    {
      $id: "2",
      title: "Sample Video 2",
      thumbnail: "https://example.com/thumbnail2.jpg",
      video: "https://example.com/video2.mp4",
      creator: { username: "User2", avatar: "https://example.com/avatar2.jpg" }
    }
  ];
};

const fetchLatestPosts = async () => {
  // Replace with your actual API call logic
  return [
    {
      $id: "3",
      title: "Latest Video 1",
      thumbnail: "https://example.com/thumbnail3.jpg",
      video: "https://example.com/video3.mp4",
      creator: { username: "User3", avatar: "https://example.com/avatar3.jpg" }
    }
  ];
};

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    };

    const loadLatestPosts = async () => {
      const fetchedLatestPosts = await fetchLatestPosts();
      setLatestPosts(fetchedLatestPosts);
    };

    loadPosts();
    loadLatestPosts();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadPosts();
    await loadLatestPosts();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <VideoCard
            title={item.title}
            thumbnail={item.thumbnail}
            video={item.video}
            creator={item.creator.username}
            avatar={item.creator.avatar}
          />
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 px-4 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  Warren
                </Text>
              </View>

              <View className="mt-1.5">
                <Text
                  className="text-4xl font-psemibold text-white"
                  resizeMode="contain"
                >CTV</Text>
              </View>
            </View>

            <SearchInput />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-lg font-pregular text-gray-100 mb-3">
                Latest Videos
              </Text>

              <Trending posts={latestPosts ?? []} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos created yet"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
