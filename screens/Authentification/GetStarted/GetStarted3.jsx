import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { enviroment } from "../../../assets";

const GetStarted3 = () => {
  const navigation = useNavigation();

  const navigateToSignUp = () => {
    // Redirect to SignUp.jsx
    navigation.navigate("SignUp");
  };

  const navigateToLogin = () => {
    // Redirect to Login.jsx
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-yellow">
      {/* Utiliser 'flex-1' et 'justify-between' pour pousser le bouton en bas */}
      <View className="flex-1 justify-between">
        {/* Conteneur central pour le contenu */}
        <View className="flex-1 items-center justify-center">
          <Image source={enviroment} className="w-30 h-30" />
          <View className="flex flex-row gap-1 mt-5">
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
            <View className="bg-gray-700 py-1 rounded-full px-3 opacity-40"></View>
            <View className="bg-gray-200 py-1 rounded-full px-3 opacity-70"></View>
          </View>
          <Text className="text-secondary-green text-2xl font-sans mt-10 px-20 text-center">
            Plus tu t'impliques, plus tu gagnes !
          </Text>
          <Text className="text-secondary-green text-xl font-sansBold mt-8 text-center px-4">
            Remporte des récompenses ou fais des dons pour soutenir des causes
            environnementales qui te tiennent à cœur.
          </Text>
        </View>
        {/* Bouton en bas */}
        <View className="w-full px-12 pb-10">
          <TouchableOpacity
            className="bg-primary-green py-4 rounded-full items-center justify-center"
            onPress={navigateToSignUp}
          >
            <Text className="text-primary-beige text-xl font-sansBold">
              S'inscrire
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="items-center mt-2"
            onPress={navigateToLogin}
          >
            <Text className="text-secondary-green text-lg font-sansBold">
              J'ai déjà un compte
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetStarted3;
3;
