import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { panda_enjoy } from "../../assets";
import InviteYourFriends from "../../components/Sections/InviteYourFriends";

const EventRegisterConfirmation = () => {
  const navigation = useNavigation();

  const navigateToEvents = () => {
    navigation.navigate("Events");
  };

  const navigateToEventCancel = () => {
    navigation.navigate("EventCancel");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-green h-2/5">
        <Text className="text-5xl text-primary-beige font-wakBold text-center mt-24">
          Super !
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-4">
          Tu es inscrit(e) à cet événement !
        </Text>
        <Image source={panda_enjoy} className="mx-auto mt-8" />
      </View>
      <View>
        <Text className="text-base text-primary-green font-sansBold mt-16 mx-4">
          Tu peux retrouver toutes les informations concernant cet évènement
          dans tes Participations à venir sur la page Évènements !
        </Text>
        <Text className="text-base text-primary-green font-sansBold mt-8 mx-4">
          Tu n’auras plus qu’à scanner le QR code présent sur place pour
          récupérer tes points !
        </Text>
        <InviteYourFriends />
        <View className="flex justify-center items-center mt-16 mb-10">
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6"
            onPress={navigateToEvents}
          >
            <Text className="font-sans text-lg text-primary-beige">
              Trop bien !
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToEventCancel}>
            <Text className="text-primary-yellow font-sansBold text-xl mt-4">
              Je ne veux plus participer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventRegisterConfirmation;
