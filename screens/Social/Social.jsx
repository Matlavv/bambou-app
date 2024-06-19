import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, TextInput, TouchableOpacity, View } from "react-native";
import ProfilePic from "../../components/Badges/ProfilePic";
import UserCredits from "../../components/Badges/UserCredits";
import ScrollPosts from "../../components/Social/ScrollPosts";

const Social = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="mt-6">
        <View className="flex-row items-center">
          <View className="flex-row w-3/6 bg-secondary-beige rounded-full p-4 items-center justify-between ml-5 mr-2">
            <TextInput
              placeholder="Rechercher"
              className="text-base text-primary-green font-sansBold"
            />
            <Ionicons name="search" size={24} color="#005B41" />
          </View>
          <TouchableOpacity className="p-4 bg-primary-green rounded-full">
            <Ionicons name="add" size={24} color="#FFF0E1" />
          </TouchableOpacity>
          <View className="flex-row justify-end items-center m-4">
            <View className="relative">
              <ProfilePic className="rounded-full" />
              <View className="absolute -bottom-4">
                <UserCredits />
              </View>
            </View>
          </View>
        </View>
        <ScrollPosts />
      </View>
    </SafeAreaView>
  );
};

export default Social;
