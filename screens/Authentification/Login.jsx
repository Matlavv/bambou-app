import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <View className="items-center justify-center px-4 py-8 mb-6">
        <Text className="text-5xl text-primary-beige font-wakExtraBold text-center w-64">
          Bon retour parmi nous !
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-5">
          Connecte-toi à Bambou et réalise de nouvelles actions écolos !
        </Text>
      </View>
      <View className="flex bg-primary-beige h-full">
        <View className="items-center p-12">
          <Text className="text-primary-green font-sans text-lg self-start">
            Pseudonyme
          </Text>
          <TextInput
            className="font-sansBold w-80 bg-secondary-beige rounded-2xl p-4"
            placeholder="Ton pseudo"
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
          <View className="w-80 mt-2 flex justify-end">
            <TouchableOpacity>
              <Text className="text-primary-green text-base font-sansBold text-right">
                Mot de passe oublié ?
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Login button */}
        <View className="w-full px-12 pb-12 mt-52">
          <TouchableOpacity className="bg-primary-yellow py-4 rounded-full items-center w-full">
            <Text className="text-primary-beige text-lg font-sansBold">
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
