import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { profilePic } from "../../assets";

const posts = [
  {
    id: 1,
    title: "Post 1",
    username: "User 1",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    location: "Marseille, France",
  },
  {
    id: 2,
    title: "Post 2",
    username: "User 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    location: "Marseille, France",
  },
];

const ScrollPosts = () => {
  return (
    <ScrollView className="mt-6">
      {posts.map((post) => (
        <View key={post.id} className="bg-secondary-beige rounded-2xl p-4 my-2">
          {/* Partie haute, photo de profil, username et localisation */}
          <View className="flex-row items-center">
            <Image
              source={profilePic}
              className="rounded-full w-12 h-12 mr-4"
            />
            <View>
              <Text className="text-lg text-primary-green font-sans">
                {post.username}
              </Text>
              <Text className="text-base text-primary-green font-sansBold">
                {post.location}
              </Text>
            </View>
          </View>
          {/* Contenu du post */}
          <Text className="text-base text-primary-green font-sansBold mt-2">
            {post.content}
          </Text>
          {/* Likes et commentaires */}
          <View className="flex-row mt-2">
            <View className="flex-row items-center">
              <Ionicons name="heart-outline" size={28} color="#D33718" />
              <Text className="text-lg text-primary-green font-sansBold mx-2">
                12
              </Text>
            </View>
            <View className="flex-row items-center mx-4">
              <Ionicons name="chatbubble-outline" size={28} color="#005B41" />
              <Text className="text-lg text-primary-green font-sansBold mx-2">
                3
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ScrollPosts;
