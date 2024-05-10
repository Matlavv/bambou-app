import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const InviteYourFriends = () => {
  return (
    <View>
      <Text className="text-xl font-sans text-primary-green m-4">
        Invite tes amis à participer !
      </Text>
      <View className="bg-secondary-beige rounded-xl p-2 mx-4">
        <TouchableOpacity className="flex-row justify-between mx-1">
          <Text className="text-primary-green font-sansBold text-lg">
            Partager le lien de l'événement
          </Text>
          <Ionicons name="chevron-forward" size={24} color="#005B41" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default InviteYourFriends;
