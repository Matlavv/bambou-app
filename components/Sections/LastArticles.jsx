import React from "react";
import { Image, ScrollView, TouchableOpacity } from "react-native";
import { article1, article2, article3 } from "../../assets";

const LastArticles = () => {
  const handleArticlePress = (article) => {
    console.log(`Article ${article} clicked!`);
  };

  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="flex-row pl-5 mt-7"
    >
      <TouchableOpacity onPress={() => handleArticlePress("Article 1")}>
        <Image
          source={article1}
          className=" w-72 h-72 rounded-xl"
          alt="article1"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleArticlePress("Article 2")}>
        <Image
          source={article2}
          className="w-72 h-72 rounded-xl"
          alt="article2"
          resizeMode="contain"
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleArticlePress("Article 3")}>
        <Image
          source={article3}
          className="w-72 h-72 mr-10 rounded-md"
          alt="article3"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default LastArticles;
