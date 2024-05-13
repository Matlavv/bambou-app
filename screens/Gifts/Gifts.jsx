import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import ProfilePic from "../../components/Badges/ProfilePic";
import UserCredits from "../../components/Badges/UserCredits";
import Donations from "../../components/GiftsSection/Donations";
import Rewards from "../../components/GiftsSection/Rewards";

const Tab = createMaterialTopTabNavigator();

const Gifts = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="bg-topaz justify-center pb-6">
        <View className="mt-7">
          <Text className="absolute top-5 left-0 right-4 text-xl text-primary-beige font-sansBold text-center">
            Récompenses et dons
          </Text>
          <View className="flex-row justify-end items-center m-4">
            <View className="relative">
              <ProfilePic className="w-24 h-24 rounded-full" />
              <View className="absolute -bottom-4">
                <UserCredits />
              </View>
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center">
          <Text className="text-primary-beige font-wakExtraBold text-7xl text-center">
            Echange tes points
          </Text>
        </View>
      </View>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#8C3E3E",
          tabBarInactiveTintColor: "#FFF0E1",
          tabBarStyle: { backgroundColor: "#8C3E3E" },
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#FFF0E1",
            height: 30, // Hauteur de l'indicateur
            borderRadius: 15, // Rayon pour un cercle parfait
            marginVertical: 10, // Ajustement vertical
            paddingHorizontal: 10, // Ajout de padding horizontal pour entourer le texte
          },
        }}
      >
        <Tab.Screen name="Récompenses" component={Rewards} />
        <Tab.Screen name="Dons" component={Donations} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Gifts;
