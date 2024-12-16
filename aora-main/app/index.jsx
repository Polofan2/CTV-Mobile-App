import { useRouter } from "expo-router"; // Import useRouter
import { StatusBar } from "expo-status-bar";
import { View, Text, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { images } from "../constants";
import { CustomButton } from "../components";

const Welcome = () => {
  const router = useRouter(); // Initialize the router

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full flex justify-center items-center h-full px-4">

          <View className="relative mt-5">
            <Text className="text-3xl text-white font-bold text-center">
              Cartel Television{" "}
              <Text className="text-blue-700">CTV</Text>
            </Text>

          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
          </Text>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/sign-in")} // Use router to navigate
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0e0e12" style="light" />
    </SafeAreaView>
  );
};

export default Welcome;
