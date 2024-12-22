import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  FlatList,
} from "react-native";
import { ResizeMode, Video } from "expo-av";

const channelCategories = [
  {
    category: "News",
    channels: [
      { id: 1, name: "CNN", videoUri: "https://example.com/cnn.mp4" },
      { id: 2, name: "BBC", videoUri: "https://example.com/bbc.mp4" },
    ],
  },
  {
    category: "Sports",
    channels: [
      { id: 3, name: "ESPN", videoUri: "https://example.com/espn.mp4" },
      { id: 4, name: "Fox Sports", videoUri: "https://example.com/foxsports.mp4" },
    ],
  },
  {
    category: "Entertainment",
    channels: [
      { id: 5, name: "MTV", videoUri: "https://example.com/mtv.mp4" },
      { id: 6, name: "HBO", videoUri: "https://example.com/hbo.mp4" },
    ],
  },
];

const LiveTV = () => {
  const [selectedChannel, setSelectedChannel] = useState(
    channelCategories[0].channels[0]
  );
  const screenWidth = Dimensions.get("window").width;

  const renderChannels = (channels) => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 10 }}
    >
      {channels.map((channel) => (
        <TouchableOpacity
          key={channel.id}
          onPress={() => setSelectedChannel(channel)}
          className={`p-4 m-2 rounded-xl ${
        selectedChannel.id === channel.id ? "bg-secondary" : "bg-primary"
      } w-40`}
        >
          <Text className="text-white text-center">{channel.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="h-1/2 sticky top-0 z-10">
        <Video
          source={{ uri: selectedChannel.videoUri }}
          className="w-full h-full rounded-2xl"
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          isLooping
        />
      </View>

      <ScrollView className="flex-1">
        {channelCategories.map((category) => (
          <View key={category.category} className="py-4">
            <Text className="text-xl text-white font-bold px-4">
              {category.category}
            </Text>
            {renderChannels(category.channels)}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LiveTV;
