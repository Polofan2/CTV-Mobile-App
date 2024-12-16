import { useRouter } from "expo-router"; // Corrected import for useRouter
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Image, FlatList, TouchableOpacity } from "react-native";

import { icons } from "../../constants";
import useAppwrite from "../../lib/useAppwrite";
import { getUserPosts, signOut } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";
import { EmptyState, InfoBox, VideoCard } from "../../components";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const router = useRouter(); // Initialize the router

  const { data: posts, refetch } = useAppwrite(() => getUserPosts(user?.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);

    router.replace("/sign-in"); // Navigate to sign-in page
  };

  if (!user) {
    // Optional: Handle the case when user data is not available
    return (
      <SafeAreaView className="bg-primary h-full">
        <EmptyState title="User not logged in" subtitle="Please log in to continue" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={posts || []} // Ensure safe handling when posts data is undefined
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
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="No videos found for this profile"
          />
        )}
        ListHeaderComponent={() => (
          <View className="w-full flex justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity
              onPress={logout}
              className="flex w-full items-end mb-10"
            >
              <Image
                source={icons.logout}
                resizeMode="contain"
                className="w-6 h-6"
              />
            </TouchableOpacity>

            <View className="w-16 h-16 border border-secondary rounded-lg flex justify-center items-center">
              <Image
                source={{ uri: user?.avatar }}
                className="w-[90%] h-[90%] rounded-lg"
                resizeMode="cover"
              />
            </View>

            <InfoBox
              title={user?.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex flex-row">
              <InfoBox
                title={posts?.length || 0} // Safely handle undefined posts
                subtitle="Posts"
                titleStyles="text-xl"
                containerStyles="mr-10"
              />
              <InfoBox
                title="1.2k" // Placeholder data for followers count
                subtitle="Followers"
                titleStyles="text-xl"
              />
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default Profile;
