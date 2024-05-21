import { useNavigation } from "@react-navigation/core";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";

const ProfilePic = () => {
  const navigation = useNavigation();

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  return (
    <View>
      <TouchableOpacity onPress={navigateToProfile}>
        <Image
          source={profilePic}
          alt="profilePic"
          className="rounded-full w-20 h-20"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;
