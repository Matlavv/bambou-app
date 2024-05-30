import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";
import { app } from "../../firebaseConfig";
import JoinEventsModal from "../../screens/Events/JoinEventsModal";

const AllUpcomingEvents = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [createdEvents, setCreatedEvents] = useState([]);
  const [enrolledEvents, setEnrolledEvents] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  const fetchEvents = async () => {
    if (user) {
      try {
        // Fetch created events
        const eventsSnapshot = await getDocs(collection(db, "events"));
        const createdEventsList = [];
        const enrolledEventsList = [];

        eventsSnapshot.forEach((doc) => {
          const eventData = doc.data();
          if (eventData.userId === user.uid) {
            createdEventsList.push({ id: doc.id, ...eventData });
          }
        });

        setCreatedEvents(createdEventsList);

        // Fetch enrolled events
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.enrolledEvents) {
            for (const eventId of userData.enrolledEvents) {
              const eventDoc = await getDoc(doc(db, "events", eventId));
              if (eventDoc.exists()) {
                enrolledEventsList.push({
                  id: eventDoc.id,
                  ...eventDoc.data(),
                });
              }
            }
          }
        }

        setEnrolledEvents(enrolledEventsList);
      } catch (error) {
        console.error("Error fetching events: ", error);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
    }, [user])
  );

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

  const renderEvent = (event, index) => (
    <TouchableOpacity
      key={event.id}
      className={`${getBackgroundColor(index)} m-3 mx-5 p-4 rounded-xl mt-5`}
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
          {event.address}
        </Text>
      </View>
      <Text className="text-primary-beige font-sans text-lg mt-2">
        {event.date}
      </Text>
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
  );

  return (
    <ScrollView className="mt-5">
      <Text className="text-xl font-sans mx-5 my-2 text-primary-green">
        Mes évènements
      </Text>
      {createdEvents.map(renderEvent)}
      <Text className="text-xl font-sans mx-5 my-2 text-primary-green">
        Évènements à venir
      </Text>
      {enrolledEvents.map(renderEvent)}
      {selectedEvent && (
        <JoinEventsModal
          visible={modalVisible}
          onRequestClose={closeModal}
          event={selectedEvent}
        />
      )}
    </ScrollView>
  );
};

export default AllUpcomingEvents;
