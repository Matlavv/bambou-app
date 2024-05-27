import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { carrefour } from "../../assets";

const HistoryDonations = () => {
  return (
    <ScrollView>
      <View className="flex-row bg-secondary-beige rounded-2xl m-4 p-4 items-center">
        <Image
          source={carrefour}
          className="w-16 h-16 rounded-full"
          alt="brand logo"
        />
        <View className="ml-6 flex-1">
          <Text className="text-lg text-primary-green font-sans">WWF</Text>
          <Text className="text-lg text-primary-green font-sans">
            31/12/2021
          </Text>
        </View>
        <Text className="text-2xl text-primary-green font-sans">1000€</Text>
      </View>
    </ScrollView>
  );
};

export default HistoryDonations;
