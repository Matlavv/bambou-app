import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import BrandsList from "../Badges/BrandsList";

const Rewards = () => {
  return (
    <View className="flex-1">
      <View className="flex-row items-center mt-3">
        <View className="flex-row w-3/4 bg-secondary-beige rounded-full p-3 items-center justify-between ml-5 mr-2">
          <TextInput
            placeholder="Rechercher une marque"
            className="text-base text-primary-green font-sansBold"
          />
          <Ionicons name="search" size={24} color="#005B41" />
        </View>
        <TouchableOpacity className="p-4 bg-primary-yellow rounded-full mx-1">
          <Ionicons name="filter" size={24} color="#FFF0E1" />
        </TouchableOpacity>
      </View>
      <View className="flex-1">
        <BrandsList />
      </View>
    </View>
  );
};

export default Rewards;
