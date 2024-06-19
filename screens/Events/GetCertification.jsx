import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { panda_idea } from "../../assets";

const GetCertification = () => {
  const navigation = useNavigation();

  const navigateToEvents = () => {
    navigation.navigate("Events");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="bg-primary-green h-2/4">
          <Text className="text-6xl text-primary-beige font-wakBold text-center mt-12">
            Tu souhaites créer un évènement ?
          </Text>
          <Image source={panda_idea} className="mx-auto" />
        </View>
        <View className="flex-1">
          <Text className="text-base text-primary-green font-sansBold mt-12 mx-4">
            Pour pouvoir créer un évènement, il faut que ton profil soit
            certifié(e).
          </Text>
          <Text className="text-base text-primary-green font-sansBold mt-4 mx-4">
            Pour cela, envoie nous ta carte d’identité et si tout est en ordre,
            nous te certifierons dans les plus brefs délais !
          </Text>
        </View>
      </View>
      <View className="mb-10">
        <View className="flex justify-center items-center">
          <TouchableOpacity className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6">
            <Text className="font-sans text-lg text-primary-beige">
              Je me fais certifier
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-secondary-yellow font-sansBold text-xl mt-4">
              Plus tard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default GetCertification;
GetCertification;
