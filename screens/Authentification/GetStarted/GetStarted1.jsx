import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { forest } from "../../../assets";

const GetStarted1 = () => {
  const navigation = useNavigation();

  const navigateToGetStarted2 = () => {
    // Redirect to GetStarted2.jsx
    navigation.navigate("GetStarted2");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-red">
      {/* Utiliser 'flex-1' et 'justify-between' pour pousser le bouton en bas */}
      <View className="flex-1 justify-between">
        {/* Conteneur central pour le contenu */}
        <View className="flex-1 items-center justify-center">
          <Image source={forest} className="w-30 h-30" />
          <View className="flex flex-row gap-1 mt-5">
            <View className="bg-gray-200 py-1 rounded-full px-3 opacity-70"></View>
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
          </View>
          <Text className="text-primary-beige text-2xl font-sans mt-10">
            Bienvenue sur Bambou !
          </Text>
          <Text className="text-primary-beige text-xl font-sansBold mt-8 text-center">
            Découvre une nouvelle façon d'agir pour la planète en participant à
            des événements environnementaux locaux !
          </Text>
        </View>
        {/* Bouton en bas */}
        <View className="w-full px-12 pb-10">
          <TouchableOpacity
            className="bg-primary-green py-4 rounded-full items-center justify-center"
            onPress={navigateToGetStarted2}
          >
            <Text className="text-primary-beige text-xl font-sansBold">
              Suivant
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted1;
