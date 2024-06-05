import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import ProfilePic from "../../components/Badges/ProfilePic";
import UserCredits from "../../components/Badges/UserCredits";
import AllEvents from "../../components/EventsSection/AllEvents";
import AllUpcomingEvents from "../../components/EventsSection/AllUpcomingEvents";
import { app } from "../../firebaseConfig";

const Tab = createMaterialTopTabNavigator();

const Events = () => {
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [bookmarkedEvents, setBookmarkedEvents] = useState([]);
  const [events, setEvents] = useState([]);
  const db = getFirestore(app);
  const auth = getAuth(app);
  const user = auth.currentUser;

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

  useEffect(() => {
    fetchBookmarkedEvents();
    fetchEvents();
  }, [user]);

  const filteredEvents = showBookmarked
    ? events.filter((event) => bookmarkedEvents.includes(event.id))
    : events;

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-red justify-center">
        <View className="mt-7">
          <Text className="absolute top-5 left-0 right-0 text-2xl text-primary-beige font-sansBold text-center">
            Evènements
          </Text>
          <View className="flex-row justify-end items-center m-4">
            <View className="relative">
              <ProfilePic className="w-24 h-24 rounded-full" />
              <View className="absolute -bottom-4">
                <UserCredits />
              </View>
            </View>
          </View>
        </View>
        <View className="flex items-center justify-center">
          <Text className="text-primary-beige font-wakExtraBold text-7xl text-center">
            Passe à l'action
          </Text>
        </View>
      </View>
      {/* Tab Navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#DF5633",
          tabBarInactiveTintColor: "#FFF0E1",
          tabBarStyle: { backgroundColor: "#DF5633" },
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#FFF0E1",
            height: 30, // Hauteur de l'indicateur
            borderRadius: 15, // Rayon pour un cercle parfait
            marginVertical: 10, // Ajustement vertical
            paddingHorizontal: 10, // Ajout de padding horizontal pour entourer le texte
          },
        }}
      >
        <Tab.Screen name="Tous">
          {() => <AllEvents events={filteredEvents} />}
        </Tab.Screen>
        <Tab.Screen
          name="Participations à venir"
          component={AllUpcomingEvents}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Events;
