import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { save_the_earth } from "../../../assets";

const GetStarted2 = () => {
  const navigation = useNavigation();

  const navigateToGetStarted3 = () => {
    // Redirect to GetStarted3.jsx
    navigation.navigate("GetStarted3");
  };

  return (
    <SafeAreaView className="flex-1 bg-topaz">
      {/* Utiliser 'flex-1' et 'justify-between' pour pousser le bouton en bas */}
      <View className="flex-1 justify-between">
        {/* Conteneur central pour le contenu */}
        <View className="flex-1 items-center justify-center">
          <Image source={save_the_earth} className="w-30 h-30" />
          <View className="flex flex-row gap-1 mt-5">
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
            <View className="bg-gray-200 py-1 rounded-full px-3 opacity-70"></View>
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
          </View>
          <Text className="text-primary-beige text-2xl font-sans mt-10 px-20 text-center">
            Participe à des évènements et gagne des points !{" "}
          </Text>
          <Text className="text-primary-beige text-xl font-sansBold mt-8 text-center px-4">
            Scanne le QR code présent sur le lieu de l’évènement afin de
            récupérer tes points et d’obtenir des récompenses !
          </Text>
        </View>
        {/* Bouton en bas */}
        <View className="w-full px-12 pb-10">
          <TouchableOpacity
            className="bg-primary-red py-4 rounded-full items-center justify-center"
            onPress={navigateToGetStarted3}
          >
            <Text className="text-primary-beige text-xl font-sansBold">
              Suivant-
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted2;
