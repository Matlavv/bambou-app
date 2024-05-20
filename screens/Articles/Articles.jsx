import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import ProfilePic from "../../components/Badges/ProfilePic";
import UserCredits from "../../components/Badges/UserCredits";
import ArticlesList from "../../components/Sections/ArticlesList";

const Articles = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-green justify-center pb-10">
        <View className="mt-7">
          <Text className="absolute top-5 left-0 right-4 text-xl text-primary-beige font-sansBold text-center">
            Articles
          </Text>
          <View className="flex-row justify-end items-center m-4">
            <View className="relative">
              <ProfilePic className="w-24 h-24 rounded-full" />
              <View className="absolute -bottom-4">
                <UserCredits />
              </View>
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center">
          <Text className="text-primary-beige font-wakExtraBold text-7xl text-center">
            Reste informé
          </Text>
        </View>
      </View>
      <ScrollView>
        <ArticlesList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Articles;
