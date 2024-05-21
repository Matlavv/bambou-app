import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const EditUsername = () => {
  const navigation = useNavigation();

  return (
    <View>
      <View className="flex-row mt-14 ml-4">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Nom d'utilisateur
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton nom d'utilisateur
        </Text>
        <TextInput className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4" />
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

export default EditUsername;
