import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MapView from "react-native-maps";
import { profilePic } from "../../assets";
import InviteYourFriends from "../../components/Sections/InviteYourFriends";

const GetEventsDetailsModal = ({ visible, onRequestClose, event }) => {
  const navigation = useNavigation();

  const navigateToEventCancel = () => {
    navigation.navigate("EventCancel");
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView className="flex-1">
        <ScrollView className="bg-primary-beige">
          <TouchableOpacity
            className="absolute right-2 p-3"
            onPress={onRequestClose}
          >
            <Ionicons name="close" size={42} color="#005B41" />
          </TouchableOpacity>
          <Text className="text-4xl text-primary-green font-wakExtraBold mx-4 mt-10">
            {event.title}
          </Text>
          {/* participants */}
          <View className="bg-secondary-beige p-1 rounded-full w-1/3 m-3">
            <Text className="text-base text-primary-green font-sansBold p-1">
              {event.participants} participants
            </Text>
          </View>
          {/* Pictures of participating people */}
          <View className="flex-row m-4 items-center justify-between">
            <View className="flex-row">
              <Image
                source={profilePic}
                className="w-12 h-12 rounded-full z-10"
                alt="profile picture"
              />
              <Image
                source={profilePic}
                className="w-12 h-12 rounded-full -ml-4 z-10"
                alt="profile picture"
              />
              <Image
                source={profilePic}
                className="w-12 h-12 rounded-full -ml-4 z-10"
                alt="profile picture"
              />
              <Image
                source={profilePic}
                className="w-12 h-12 rounded-full -ml-4 z-10"
                alt="profile picture"
              />
              <Text className="m-2 text-primary-green font-sansBold text-lg ">
                + 5 autres
              </Text>
            </View>
          </View>
          <Text className="text-xl text-primary-green font-sans mx-4">
            {event.date}
          </Text>
          {/* Organisator */}
          <View className="flex-row m-4 items-center bg-primary-green rounded-xl p-3">
            <Image
              source={profilePic}
              className="w-16 h-16 rounded-full z-10"
              alt="profile picture"
            />
            <View className="flex-col ml-4">
              <Text className="text-primary-beige opacity-70 font-sansBold">
                Organisateur(trice)
              </Text>
              <Text className="text-base text-primary-beige font-sans">
                {event.organisator}
              </Text>
              <Text className="text-primary-beige font-sansBold">
                Ecologiste engagé
              </Text>
            </View>
          </View>
          {/* Description */}
          <Text className="text-primary-green font-sansBold mx-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officiis
            adipisci dolorum, recusandae similique modi nihil exercitationem
            incidunt provident debitis? Fugiat ratione sunt culpa quia eveniet
            magni optio molestiae porro quos?
          </Text>
          {/* Address & map */}
          <View className="flex-row m-4 items-center bg-secondary-beige rounded-xl p-3">
            <Ionicons name="location-outline" size={24} color="#005B41" />
            <Text className="text-primary-green font-sansBold text-lg ml-2">
              {event.address}
            </Text>
          </View>
          <MapView
            className="h-56 m-4 w-90"
            initialRegion={{
              latitude: event.latitude,
              longitude: event.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <View className="flex-row mx-4 items-center">
            <FontAwesome5 name="wheelchair" size={24} color="#005B41" />
            <Text className="text-primary-green font-sansBold text-base mx-3">
              Cet événement est accessible aux personnes en situation de
              handicap
            </Text>
          </View>
          <InviteYourFriends />
          <View className="flex justify-center items-center mt-7 mb-10">
            <TouchableOpacity className="flex-row items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6">
              <Text className="font-sans text-lg text-primary-beige mr-2">
                Je récupère mes points !
              </Text>
              <Ionicons name="qr-code-outline" size={24} color="#FFF0E1" />
            </TouchableOpacity>
            <TouchableOpacity
              className="mt-4"
              onPress={() => {
                onRequestClose();
                navigateToEventCancel();
              }}
            >
              <Text className="text-primary-yellow text-xl font-sansBold">
                Je ne veux plus participer
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default GetEventsDetailsModal;
