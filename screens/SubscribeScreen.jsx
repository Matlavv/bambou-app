import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { panda_please } from "../assets";

const SubscribeScreen = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-green h-2/5 justify-center">
        <Text className="text-5xl text-primary-beige font-wakBold text-center mt-36">
          Abonne toi !
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-4 mx-4">
          Il te faut l'abonnement Premium pour lire la suite de cet article !
        </Text>
        <Image source={panda_please} className="mx-auto mt-8" />
      </View>
      <View className="flex-1 justify-between">
        <View>
          <Text className="text-base text-primary-green font-sansBold mt-20 mx-4">
            L'abonnement Premium te permettra d'accéder à tous nos articles afin
            de t'informer d'avantage sur l'écologie et l'environnement.
          </Text>
          <Text className="text-base text-primary-green font-sansBold mt-8 mx-4">
            Chaque abonnement contribue directement à l'évolution de notre
            application, nous permettant d'apporter des améliorations continues
            pour vous offrir la meilleur expérience possible.
          </Text>
        </View>
        <View className="mb-10">
          <View className="flex justify-center items-center mt-16 mb-4">
            <TouchableOpacity className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6">
              <Text className="font-sans text-lg text-primary-beige">
                Je m'abonne pour 9,99€
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="items-center"
          >
            <Text className="text-primary-yellow font-sansBold text-xl">
              Plus tard
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SubscribeScreen;
