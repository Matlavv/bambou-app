import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { credits } from "../../assets";

const data = [
  {
    id: 1,
    description: "Mangez un repas végétarien",
    points: 10,
  },
  {
    id: 2,
    description: "Eteins la lumière en sortant d'une pièce",
    points: 50,
  },
  {
    id: 3,
    description: "Utilisez un transport en commun",
    points: 50,
  },
];

const DailyChallenges = () => {
  return (
    <View className="m-4">
      {data.map((challenge) => (
        <View
          key={challenge.id}
          className="my-2 flex-row justify-between items-center bg-primary-beige p-4 rounded-xl"
        >
          <Text
            className="text-primary-green font-sansBold text-lg truncate w-3/4"
            numberOfLines={1} // Limit the text to a single line
          >
            {challenge.description}
          </Text>
          <TouchableOpacity className="flex-row items-center justify-center bg-primary-yellow px-3 py-1 rounded-full">
            <Text className="text-primary-beige font-wakBold text-lg">
              {challenge.points}
            </Text>
            <Image source={credits} className="w-4 h-4 m-1" alt="credits" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

export default DailyChallenges;
