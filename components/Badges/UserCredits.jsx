import React from "react";
import { Image, Text, View } from "react-native";
import { credits } from "../../assets";

const UserCredits = () => {
  return (
    <View>
      <View className="bg-primary-yellow p-1 rounded-3xl w-20">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-primary-beige font-wakBold text-base">100</Text>
          <Image source={credits} alt="credits" className="m-1" />
        </View>
      </View>
    </View>
  );
};

export default UserCredits;
