import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { panda_strong } from "../assets";
import DailyChallenges from "../components/Badges/DailyChallenges";
import ProfilePic from "../components/Badges/ProfilePic";
import UserCredits from "../components/Badges/UserCredits";
import LastArticles from "../components/Sections/LastArticles";
import UpcomingEvents from "../components/Sections/UpcomingEvents";

const HomeScreen = () => {
  const navigation = useNavigation();

  const navigateToEvents = () => {
    navigation.navigate("Event");
  };

  const navigateToArticles = () => {
    navigation.navigate("Articles");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView>
        {/* Header */}
        <View className="m-6 mt-10">
          <View className="flex-row justify-between items-center">
            <View>
              <Text className="text-2xl text-primary-green font-sans">
                Bonjour John Doe
              </Text>
              <Text className="text-primary-green text-lg font-sansBold">
                Prêt(e) à agir pour notre planète ?
              </Text>
            </View>
            <View className="relative">
              <ProfilePic className="w-24 h-24 rounded-full" />
              <View className="absolute -bottom-4">
                <UserCredits />
              </View>
            </View>
          </View>
        </View>
        {/* challenge section */}
        <View className="bg-primary-green m-5 rounded-2xl pb-8">
          <Text className="text-primary-beige font-wakBold text-5xl m-4">
            Commence tes défis quotidiens !
          </Text>
          <DailyChallenges />
          <Image
            source={panda_strong}
            className="absolute w-40 h-40 -bottom-24 -left-8"
            alt="panda strong badge"
          />
        </View>
        {/* Upcoming events */}
        <View className="mt-20">
          <Text className="text-primary-green font-wakExtraBold text-[42px] mx-4">
            Événements à venir
          </Text>
          <Text className="text-primary-green font-sansBold text-xl mx-4">
            Proche de chez toi
          </Text>
          <UpcomingEvents />
          <View className="flex justify-center items-center mt-5">
            <TouchableOpacity
              className="bg-primary-yellow p-3 px-6 flex items-center rounded-full"
              onPress={navigateToEvents}
            >
              <Text className="font-sans text-lg text-primary-beige">
                Voir tous les événements
              </Text>
            </TouchableOpacity>
          </View>
          <View className="mt-7">
            <Text className="text-primary-green font-wakExtraBold text-[42px] mx-4">
              Nos derniers articles
            </Text>
            <LastArticles />
            <View className="flex justify-center items-center mt-7 mb-10">
              <TouchableOpacity
                className="bg-primary-yellow p-3 px-6 flex items-center rounded-full"
                onPress={navigateToArticles}
              >
                <Text className="font-sans text-lg text-primary-beige">
                  Voir tous les articles
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
