import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { profilePic } from "../../assets";
import { app, db } from "../../firebaseConfig";
import CreateEventModal from "../../screens/Events/CreateEventModal";
import JoinEventsModal from "../../screens/Events/JoinEventsModal";

function AllEvents() {
  const [modalVisible, setModalVisible] = useState(false);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [isCertified, setIsCertified] = useState(false);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const navigation = useNavigation();
  const auth = getAuth(app);
  const user = auth.currentUser;

  const fetchEvents = async () => {
    try {
      const eventsCollection = collection(db, "events");
      const eventsSnapshot = await getDocs(eventsCollection);
      const eventsList = eventsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEvents(eventsList);
    } catch (error) {
      console.error("Error fetching events: ", error);
    }
  };

  const fetchUserDetails = async () => {
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const userData = userDoc.data();
        setIsCertified(userData.isCertified);
        setBookmarkedEvents(userData.bookmarkedEvents || []);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
    fetchUserDetails();
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      fetchEvents();
      fetchUserDetails(); // Update user details on focus
    }, [])
  );

  const openModal = (event) => {
    setSelectedEvent(event);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openCreateModal = () => {
    if (isCertified) {
      setCreateModalVisible(true);
    } else {
      Alert.alert(
        "Accès refusé",
        "Vous devez être certifié pour créer un événement."
      );
    }
  };

  const closeCreateModal = () => {
    setCreateModalVisible(false);
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

  const extractCityCountry = (address) => {
    const parts = address.split(",");
    if (parts.length < 2) return address;
    const city = parts[parts.length - 2].trim();
    const country = parts[parts.length - 1].trim();
    return `${city}, ${country}`;
  };

  const toggleBookmark = async (eventId) => {
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

  const filteredEvents = showBookmarked
    ? events.filter((event) => bookmarkedEvents.includes(event.id))
    : events;

  const toggleShowBookmarked = () => {
    setShowBookmarked(!showBookmarked);
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
        {/* filter les events bookmarkés */}
        <TouchableOpacity
          className="p-4 bg-primary-yellow rounded-full mx-1"
          onPress={toggleShowBookmarked}
        >
          <Ionicons
            name={showBookmarked ? "bookmark-sharp" : "bookmark-outline"}
            size={24}
            color="#FFF0E1"
          />
        </TouchableOpacity>
      </View>

      {filteredEvents.map((event, index) => (
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
              {extractCityCountry(event.address)}
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
            {/* Bookmarks an event */}
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
      <CreateEventModal
        visible={createModalVisible}
        onRequestClose={closeCreateModal}
      />
    </ScrollView>
  );
}

export default AllEvents;
