import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { carrefour } from "../../assets";

const HistoryCoupons = () => {
  return (
    <ScrollView className="m-4">
      <TouchableOpacity className="bg-secondary-beige flex-row p-4 rounded-2xl flex items-center">
        <Image
          source={carrefour}
          className="w-16 h-16 mr-6 rounded-full"
          alt="brand logo"
        />
        <View className="">
          <Text className="text-lg text-primary-green font-sans">
            Bon de reduction de 10€
          </Text>
          <Text className="text-base text-primary-green font-sans">
            Valide jusqu'au 31/12/2021
          </Text>
          <View className="bg-primary-beige rounded-2xl flex items-center justify-center mt-2">
            <Text className="text-2xl text-primary-green font-wakExtraBold">
              123456
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default HistoryCoupons;
