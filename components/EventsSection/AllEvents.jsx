import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { profilePic } from "../../assets";
import CreateEventModal from "../../screens/Events/CreateEventModal";
import JoinEventsModal from "../../screens/Events/JoinEventsModal";

const data = [
  {
    id: 1,
    title: "Ramassage de dechets",
    date: "Dimanche 28 avril de 12h à 17h",
    location: "Antibes, France",
    participants: "26",
    organisator: "Pierre Dupont",
    address: "12 rue des fleurs, 06600 Antibes",
    latitude: 43.5804,
    longitude: 7.1236,
  },

  {
    id: 2,
    title: "Plantation d'arbres",
    date: "Samedi 27 avril de 17h à 19h",
    location: "Narbonne, France",
    participants: "100",
    organisator: "Pierre Dupont",
    address: "12 rue des fleurs, 06600 Antibes",
    latitude: 43.5804,
    longitude: 7.1236,
  },
  {
    id: 3,
    title: "Nettoyage de plage",
    date: "Dimanche 28 avril de 9h à 12h",
    location: "Narbonne, France",
    participants: "1500",
    organisator: "Pierre Dupont",
    address: "12 rue des fleurs, 06600 Antibes",
    latitude: 43.5804,
    longitude: 7.1236,
  },
];

function AllEvents() {
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const navigation = useNavigation();

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCreateModal = () => {
    setCreateModalVisible(true);
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
  };

  const getBackgroundColor = (index) => {
    switch (index) {
      case 0:
        return "bg-primary-red";
      case 1:
        return "bg-primary-green";
      case 2:
        return "bg-topaz";
      default:
        return "bg-primary-green";
    }
  };

  return (
    <ScrollView className="mt-5">
      {/* Search bar */}
      <View className="flex-row items-center">
        <View className="flex-row w-3/5 bg-secondary-beige rounded-full p-4 items-center justify-between ml-5 mr-2">
          <TextInput
            placeholder="Rechercher une ville"
            className="text-base text-primary-green font-sansBold"
          />
          <Ionicons name="search" size={24} color="#005B41" />
        </View>
        <TouchableOpacity className="p-4 bg-primary-green rounded-full">
          <Ionicons
            name="add"
            size={24}
            color="#FFF0E1"
            onPress={openCreateModal}
          />
        </TouchableOpacity>
        <TouchableOpacity className="p-4 bg-primary-yellow rounded-full mx-1">
          <Ionicons name="bookmark-outline" size={24} color="#FFF0E1" />
        </TouchableOpacity>
      </View>

      {data.map((event, index) => (
        <TouchableOpacity
          key={event.id}
          className={`${getBackgroundColor(
            index
          )} m-3 mx-5 p-4 rounded-xl mt-5`}
          onPress={() => openModal(event)}
        >
          <Text className="text-primary-beige font-sans text-2xl">
            {event.title}
          </Text>
          <View className="flex flex-row items-center bg-primary-beige rounded-full px-2 py-1 w-2/3 truncate mt-2">
            <Ionicons name="location-outline" size={20} color="#005B41" />
            <Text
              className="text-primary-green font-sansBold text-lg"
              numberOfLines={1}
            >
              {event.location}
            </Text>
          </View>
          <Text className="text-primary-beige font-sans text-lg mt-2">
            {event.date}
          </Text>
          {/* Pictures of participating people */}
          <View className="flex-row mt-4 items-center justify-between">
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
            </View>
            <View className="rounded-full bg-primary-beige p-2">
              <Ionicons name="bookmark-outline" size={24} color="#FF8F00" />
            </View>
          </View>
        </TouchableOpacity>
      ))}
      {selectedEvent && (
        <JoinEventsModal
          visible={modalVisible}
          onRequestClose={closeModal}
          event={selectedEvent}
        />
      )}
      <CreateEventModal
        visible={createModalVisible}
        onRequestClose={closeCreateModal}
      />
    </ScrollView>
  );
}

export default AllEvents;
