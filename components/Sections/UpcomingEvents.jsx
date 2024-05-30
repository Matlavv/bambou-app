import { Ionicons } from "@expo/vector-icons";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";
import { app } from "../../firebaseConfig"; // Assurez-vous que vous importez correctement votre configuration Firebase
import JoinEventsModal from "../../screens/Events/JoinEventsModal";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("date"), limit(3)); // Assurez-vous que le champ "date" existe et est correctement formaté dans Firestore
        const querySnapshot = await getDocs(q);
        const eventsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(eventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    };

    fetchEvents();
  }, []);

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const getBackgroundColor = (index) => {
    switch (index % 3) {
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
    <View className="mt-5">
      {events.map((event, index) => (
        <TouchableOpacity
          key={event.id}
          className={`${getBackgroundColor(index)} m-3 mx-5 p-4 rounded-xl`}
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
              {event.address}{" "}
              {/* Assurez-vous que l'adresse est dans les données de l'événement */}
            </Text>
          </View>
          <Text className="text-primary-beige font-sans text-lg mt-2">
            {event.date}{" "}
            {/* Assurez-vous que la date est dans les données de l'événement */}
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
    </View>
  );
};

export default UpcomingEvents;
