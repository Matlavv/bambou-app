import React from "react";
import { Image, View } from "react-native";
import { profilePic } from "../../assets";

const ProfilePic = () => {
  return (
    <View>
      <Image
        source={profilePic}
        alt="profilePic"
        className="rounded-full w-20 h-20"
      />
    </View>
  );
};

export default ProfilePic;
