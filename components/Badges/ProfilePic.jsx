import React from "react";
import { Image, View } from "react-native";
import { profilePic } from "../../assets";

const ProfilePic = () => {
  return (
    <View>
      <Image source={profilePic} alt="profilePic" />
    </View>
  );
};

export default ProfilePic;
