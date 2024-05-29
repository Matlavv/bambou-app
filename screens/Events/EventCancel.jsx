import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { panda_crying_baby, profilePic } from "../../assets";
import { app } from "../../firebaseConfig";

const EventCancel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { eventId } = route.params;
  const [event, setEvent] = useState(null);
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "events", eventId));
        if (eventDoc.exists()) {
          setEvent(eventDoc.data());
        }
      } catch (error) {
        console.error("Error fetching event: ", error);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleCancelParticipation = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      const eventDoc = doc(db, "events", eventId);

      await updateDoc(userDoc, {
        enrolledEvents: arrayRemove(eventId),
      });

      await updateDoc(eventDoc, {
        participants: arrayRemove(user.uid),
      });

      navigation.navigate("Events");
    } catch (error) {
      console.error("Error cancelling participation: ", error);
    }
  };

  if (!event) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center">
        <Text className="text-primary-green font-sansBold text-lg">
          Chargement de l'événement...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <View className="bg-primary-green h-2/4">
          <Text className="text-5xl text-primary-beige font-wakBold text-center mt-24">
            Tu nous quittes ?
          </Text>
          <Text className="text-xl text-primary-beige font-sansBold text-center m-4">
            Es-tu sûr(e) de vouloir annuler ta participation ?
          </Text>
          <Image source={panda_crying_baby} className="mx-auto" />
        </View>
        <View className="flex-1">
          <Text className="text-base text-primary-green font-sansBold mt-8 mx-4">
            Tu annuleras ta participation à l'évènement suivant :
          </Text>
          <View className="m-3 mx-5 p-4 rounded-xl mt-5 bg-primary-green">
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
          </View>
        </View>
      </View>
      <View className="mb-10">
        <View className="flex justify-center items-center">
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-red p-3 px-6 rounded-full w-5/6"
            onPress={handleCancelParticipation}
          >
            <Text className="font-sans text-lg text-primary-beige">
              Oui, je souhaite annuler
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigation.goBack}>
            <Text className="text-secondary-red font-sansBold text-xl mt-4">
              Je veux toujours participer !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EventCancel;
