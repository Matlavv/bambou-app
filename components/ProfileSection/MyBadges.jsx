import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";
import {
  badge_leaf,
  badge_plastic_bottle,
  badge_recycle_bag,
  badge_save_the_earth,
  badge_tree,
} from "../../assets";

const badges = [
  {
    id: 1,
    title: "Participer à 10 évènements",
    image: badge_leaf,
    progress: 0.7,
  },
  {
    id: 2,
    title: "Participer à 5 évènements",
    image: badge_plastic_bottle,
    progress: 0.5,
  },
  {
    id: 3,
    title: "Partage 10 posts",
    image: badge_recycle_bag,
    progress: 0.8,
  },
  {
    id: 4,
    title: "Sauve la planète",
    image: badge_save_the_earth,
    progress: 0.4,
  },
  {
    id: 5,
    title: "Plante un arbre",
    image: badge_tree,
    progress: 0.9,
  },
  {
    id: 6,
    title: "Plante un arbre",
    image: badge_tree,
    progress: 0.9,
  },
  {
    id: 7,
    title: "Plante un arbre",
    image: badge_tree,
    progress: 0.9,
  },
];

const MyBadges = () => {
  return (
    <ScrollView>
      <View className="p-6">
        {badges.map((badge) => (
          <View key={badge.id} className="flex-row items-center mb-4">
            <Image source={badge.image} className="w-16 h-16 rounded-full" />
            <View className="flex-1 ml-4">
              <Text className="text-primary-green font-sans text-lg mb-2">
                {badge.title}
              </Text>
              <ProgressBar
                progress={badge.progress}
                width={null}
                color="#FF7F00"
                unfilledColor="#F2DCC8"
                borderWidth={0}
                height={10}
                borderRadius={5}
              />
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MyBadges;
