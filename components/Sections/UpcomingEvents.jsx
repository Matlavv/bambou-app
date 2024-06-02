import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";
import { app } from "../../firebaseConfig";
import JoinEventsModal from "../../screens/Events/JoinEventsModal";

const UpcomingEvents = () => {
  const [events, setEvents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const eventsRef = collection(db, "events");
        const q = query(eventsRef, orderBy("date"), limit(3));
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

    const fetchBookmarkedEvents = async () => {
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setBookmarkedEvents(userData.bookmarkedEvents || []);
        }
      }
    };

    fetchEvents();
    fetchBookmarkedEvents();
  }, [user]);

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

  const toggleBookmark = async (eventId) => {
    if (!user) return;
    const userDocRef = doc(db, "users", user.uid);
    const isBookmarked = bookmarkedEvents.includes(eventId);

    try {
      if (isBookmarked) {
        await updateDoc(userDocRef, {
          bookmarkedEvents: arrayRemove(eventId),
        });
        setBookmarkedEvents((prev) => prev.filter((id) => id !== eventId));
      } else {
        await updateDoc(userDocRef, {
          bookmarkedEvents: arrayUnion(eventId),
        });
        setBookmarkedEvents((prev) => [...prev, eventId]);
      }
    } catch (error) {
      console.error("Error updating bookmarks: ", error);
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
            <TouchableOpacity
              className="rounded-full bg-primary-beige p-2"
              onPress={() => toggleBookmark(event.id)}
            >
              <Ionicons
                name={
                  bookmarkedEvents.includes(event.id)
                    ? "bookmark-sharp"
                    : "bookmark-outline"
                }
                size={24}
                color="#FF8F00"
              />
            </TouchableOpacity>
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
