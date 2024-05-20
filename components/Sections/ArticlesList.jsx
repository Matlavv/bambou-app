import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { article1, article2, article3 } from "../../assets";

const articles = [
  {
    id: 1,
    image: article1,
  },
  {
    id: 2,
    image: article2,
  },
  {
    id: 3,
    image: article3,
  },
  {
    id: 4,
    image: article1,
  },
];

const ArticlesList = () => {
  const navigation = useNavigation();
  const navigateToSubscribe = () => {
    navigation.navigate("Subscribe");
  };
  return (
    <View className="flex flex-wrap flex-row justify-between p-4">
      {articles.map((article) => (
        <TouchableOpacity
          key={article.id}
          className="w-1/2 p-2"
          onPress={navigateToSubscribe}
        >
          <Image source={article.image} className="w-full h-64 rounded-lg" />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ArticlesList;
