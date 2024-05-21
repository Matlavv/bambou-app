import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const EditPassword = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View className="flex-row mt-14 ml-4">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Mot de passe
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-primary-green mx-5 text-base font-sansBold mt-4">
          Pour définir un nouveau mot de passe, indique d’abord ton mot de passe
          actuel.
        </Text>
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton mot de passe actuel
        </Text>
        <TextInput
          className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4"
          placeholder="Ton mot de passe"
        />
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton nouveau mot de passe
        </Text>
        <TextInput
          className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4"
          placeholder="Ton mot de passe"
        />
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Confirme ton nouveau mot de passe
        </Text>
        <TextInput
          className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4"
          placeholder="Ton mot de passe"
        />
        <View className="flex justify-between items-center">
          <TouchableOpacity className="flex bg-primary-yellow p-3 rounded-full mt-10 w-1/2">
            <Text className="text-white text-lg font-sans text-center">
              Enregistrer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditPassword;
