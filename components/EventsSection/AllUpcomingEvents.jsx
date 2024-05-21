import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";
import GetEventsDetailsModal from "../../screens/Events/GetEventsDetailsModal";

const data = [
  {
    id: 1,
    title: "Ramassage de caca",
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

function AllUpcomingEvents() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
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
        <GetEventsDetailsModal
          visible={modalVisible}
          onRequestClose={closeModal}
          event={selectedEvent}
        />
      )}
    </ScrollView>
  );
}

export default AllUpcomingEvents;
