import React, { useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { bambooCoins, carrefour } from "../../assets";
import TradePointsModal from "../../screens/Gifts/TradePointsModal";

const BrandsList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  const openModal = (brand) => {
    setSelectedBrand(brand);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const brands = [
    {
      id: 1,
      name: "Carrefour",
      image: "carrefour",
      points1: 1000,
      points2: 250,
    },
    {
      id: 2,
      name: "Auchan",
      image: "carrefour",
      points1: 500,
      points2: 250,
    },
    {
      id: 3,
      name: "Leclerc",
      image: "carrefour",
      points1: 1500,
      points2: 250,
    },
    {
      id: 4,
      name: "Monoprix",
      image: "carrefour",
      points1: 2000,
      points2: 250,
    },
    {
      id: 5,
      name: "Franprix",
      image: "carrefour",
      points1: 2000,
      points2: 250,
    },
  ];

  return (
    <View>
      <FlatList
        data={brands}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: brand }) => (
          <TouchableOpacity
            className="flex-row items-center bg-secondary-beige p-3 rounded-xl mx-5 my-2"
            onPress={() => openModal(brand)}
          >
            <Image source={carrefour} className="w-16 h-16" alt="brand logo" />
            <View className="ml-4">
              <Text className="text-primary-green font-sans text-lg">
                {brand.name}
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full my-1">
                  <Text className="text-primary-beige font-wakBold text-lg">
                    {brand.points1}
                  </Text>
                  <Image source={bambooCoins} className="w-4 h-4 mx-1" />
                </View>
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full my-1 mx-2">
                  <Text className="text-primary-beige text-lg font-wakBold">
                    {brand.points2}
                  </Text>
                  <Image
                    source={bambooCoins}
                    className="w-4 h-4 mx-1"
                    alt="coin"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TradePointsModal
        visible={modalVisible}
        onRequestClose={closeModal}
        brand={selectedBrand}
      />
    </View>
  );
};

export default BrandsList;
