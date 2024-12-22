import React, { useState } from "react";
import { Text, TextInput, FlatList, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [recommendedVideos, setRecommendedVideos] = useState([
    { id: "1", title: "Video 1", description: "Description of video 1" },
    { id: "2", title: "Video 2", description: "Description of video 2" },
    { id: "3", title: "Video 3", description: "Description of video 3" },
    // Add more videos as needed
  ]);

  const handleSearch = (query) => {
    setSearchQuery(query);
    // You can filter the recommendedVideos here based on the search query
    // Example: filter the videos based on title
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity className="mb-4">
      <View className="bg-white p-4 rounded-lg shadow-md">
        <Text className="text-xl font-semibold">{item.title}</Text>
        <Text className="text-sm text-gray-500">{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="px-4 my-6 bg-primary h-full">
      <Text className="text-2xl text-white font-psemibold">Explore</Text>

      {/* Search Bar */}
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Search videos..."
        placeholderTextColor="gray"
        className="mt-4 p-2 bg-white rounded-lg text-black"
      />

      {/* Recommended Videos */}
      <FlatList
        data={recommendedVideos}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        className="mt-6"
      />
    </SafeAreaView>
  );
};

export default Explore;
