import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <View className="items-center justify-center px-4 py-8 mb-3">
        <Text className="text-5xl text-primary-beige font-wakExtraBold text-center w-64">
          Inscription
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-5">
          Crée ton compte sur Bambou !
        </Text>
      </View>
      <View className="flex bg-primary-beige h-full">
        <View className="items-center p-12">
          <Text className="text-primary-green font-sans text-lg self-start">
            Email
          </Text>
          <TextInput
            className="font-sansBold w-80 bg-secondary-beige rounded-2xl p-4"
            placeholder="Ton adresse mail"
          />
          <Text className="text-primary-green font-sans text-lg self-start mt-5">
            Mot de passe
          </Text>
          <View className="flex-row items-center w-80 bg-secondary-beige rounded-2xl">
            <TextInput
              className="flex-1 text-primary-green p-4 font-sansBold"
              placeholder="Ton mot de passe"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="p-3"
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#005B41"
              />
            </TouchableOpacity>
          </View>
          <Text className="text-primary-green font-sans text-lg self-start mt-5">
            Confirmation du mot de passe
          </Text>
          <View className="flex-row items-center w-80 bg-secondary-beige rounded-2xl">
            <TextInput
              className="flex-1 text-primary-green p-4 font-sansBold"
              placeholder="Confirme ton mot de passe"
              secureTextEntry={!passwordVisible}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="p-3"
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#005B41"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Login button */}
        <View className="w-full px-12 pb-12 mt-52">
          <TouchableOpacity className="bg-primary-yellow py-4 rounded-full items-center w-full">
            <Text className="text-primary-beige text-lg font-sansBold">
              Créer mon compte !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
