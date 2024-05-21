import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";
import { carrefour } from "../../assets";
import RadioButton from "../../components/Badges/RadioButton";
import UserCredits from "../../components/Badges/UserCredits";

const TradePointsModal = ({ visible, onRequestClose, brand }) => {
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  if (!brand) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View className="absolute inset-x-0 bottom-0 h-2/3 bg-primary-beige rounded-t-3xl flex flex-col justify-between">
        <View>
          <TouchableOpacity
            className="absolute right-2 p-3"
            onPress={onRequestClose}
          >
            <Ionicons name="close" size={42} color="#005B41" />
          </TouchableOpacity>
        </View>
        <View className="m-6 flex-1">
          <Image
            source={carrefour}
            className="w-16 h-16 rounded-full"
            alt="brand logo"
          />
          <Text className="text-4xl text-primary-green font-wakExtraBold mt-2">
            {brand.name}
          </Text>
          {/* Discounts */}
          <View className="mt-6">
            <View className="flex-row justify-between bg-secondary-beige p-4 rounded-xl items-center">
              <RadioButton
                selected={selectedDiscount === "5€"}
                onPress={() => setSelectedDiscount("5€")}
              />
              <Text className="text-lg text-primary-green font-sansBold">
                5€ de remise
              </Text>
              <UserCredits />
            </View>
            <View className="flex-row justify-between bg-secondary-beige p-4 rounded-xl mt-4 items-center">
              <RadioButton
                selected={selectedDiscount === "10€"}
                onPress={() => setSelectedDiscount("10€")}
              />
              <Text className="text-lg text-primary-green font-sansBold">
                10€ de remise
              </Text>
              <UserCredits />
            </View>
          </View>
        </View>
        <View className="flex justify-end items-center mb-5">
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6"
            onPress={onRequestClose}
          >
            <Text className="font-sans text-lg text-primary-beige">
              Je récupère le code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TradePointsModal;
