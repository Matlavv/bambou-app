import React, { useContext } from "react";
import { Text, View } from "react-native";
import { AuthContext } from "../AuthContext";
import ProfilePic from "../components/Badges/ProfilePic";

const HomeScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View>
      {/* Header */}
      <View className="mt-6">
        <Text className="text-2xl text-primary-green font-sans">
          Bonjour Matlav
        </Text>
        <Text className="text-primary-green text-lg font-sansBold">
          Prêt(e) à agir pour notre planète ?
        </Text>
        <ProfilePic />
      </View>
      <View>
        <Text className="text-9xl text-primary-red font-sans">text</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
