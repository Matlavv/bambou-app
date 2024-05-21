import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { profilePic } from "../../assets";

const Settings = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="bg-primary-beige">
        <TouchableOpacity
          className="absolute right-2 top-2 p-3 mt-6"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={42} color="#005B41" />
        </TouchableOpacity>
        <Text className="font-wakBold text-4xl text-primary-green mt-20 mx-4">
          Paramètres
        </Text>
        <Text className="text-primary-green text-lg font-sans mx-4 mt-2">
          Mon compte
        </Text>
        <View className="w-10 mt-3">
          <Image source={profilePic} className="w-24 h-24 rounded-full ml-4" />
          <TouchableOpacity className="bg-secondary-beige rounded-full p-2 absolute left-20 bottom-0">
            <FontAwesome name="pencil-square-o" size={24} color="#005B41" />
          </TouchableOpacity>
        </View>
        <View className="m-4">
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl">
            <Text className="text-primary-green ml-2 text-xl font-sans">
              Nom d'utilisateur
            </Text>
            <Text className="text-primary-green ml-2 text-base">john_doe</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl mt-2">
            <Text className="text-primary-green ml-2 text-xl font-sans">
              Adresse email
            </Text>
            <Text className="text-primary-green ml-2 text-base">
              mathis.laversin@gmail.com
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
