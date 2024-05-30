import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
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
import { app } from "../../firebaseConfig";
import UpdateCreatedEvent from "./UpdateCreatedEvent"; // Assurez-vous que le chemin est correct

const JoinEventsModal = ({ visible, onRequestClose, event }) => {
  const [organizerName, setOrganizerName] = useState("");
  const [organizerProfilePic, setOrganizerProfilePic] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [updateModalVisible, setUpdateModalVisible] = useState(false); // State pour la modale de mise à jour
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchOrganizerDetails = async () => {
      if (event.userId) {
        try {
          const userDoc = await getDoc(doc(db, "users", event.userId));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setOrganizerName(userData.firstName || "Organisateur");
            setOrganizerProfilePic(userData.profilePic || "");
          }
        } catch (error) {
          console.error("Error fetching organizer details: ", error);
        }
      }
    };

    const checkIfOwnerOrEnrolled = async () => {
      const user = auth.currentUser;
      if (user) {
        setIsOwner(user.uid === event.userId);
        setIsEnrolled(
          event.participants && event.participants.includes(user.uid)
        );
      }
    };

    if (visible) {
      fetchOrganizerDetails();
      checkIfOwnerOrEnrolled();
    }
  }, [event.userId, event.participants, visible]);

  const navigateToRegisterConfirmation = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      const userDoc = doc(db, "users", user.uid);
      const eventDoc = doc(db, "events", event.id);

      await updateDoc(userDoc, {
        enrolledEvents: arrayUnion(event.id),
      });

      await updateDoc(eventDoc, {
        participants: arrayUnion(user.uid),
      });

      onRequestClose();
      navigation.navigate("EventRegisterConfirmation");
    } catch (error) {
      console.error("Error joining event: ", error);
    }
  };

  const handleCancelParticipation = () => {
    onRequestClose();
    navigation.navigate("EventCancel", { eventId: event.id });
  };

  const handleUpdateEvent = () => {
    setUpdateModalVisible(true); // Affichez la modale de mise à jour
  };

  return (
    <>
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
            <View className="bg-secondary-beige p-1 rounded-full w-1/3 m-3">
              <Text className="text-base text-primary-green font-sansBold p-1">
                {event.participants ? event.participants.length : 0}{" "}
                participants
              </Text>
            </View>
            <View className="flex-row m-4 items-center justify-between">
              <View className="flex-row">
                {[...Array(4)].map((_, index) => (
                  <Image
                    key={index}
                    source={profilePic}
                    className={`w-12 h-12 rounded-full ${
                      index > 0 ? "-ml-4" : ""
                    } z-10`}
                    alt="profile picture"
                  />
                ))}
                {event.participants && event.participants.length > 4 && (
                  <Text className="m-2 text-primary-green font-sansBold text-lg ">
                    + {event.participants.length - 4} autres
                  </Text>
                )}
              </View>
            </View>
            <Text className="text-xl text-primary-green font-sans mx-4">
              {event.date}
            </Text>
            <View className="flex-row m-4 items-center bg-primary-green rounded-xl p-3">
              <Image
                source={
                  organizerProfilePic
                    ? { uri: organizerProfilePic }
                    : profilePic
                }
                className="w-16 h-16 rounded-full z-10"
                alt="profile picture"
              />
              <View className="flex-col ml-4">
                <Text className="text-primary-beige opacity-70 font-sansBold">
                  Organisateur(trice)
                </Text>
                <Text className="text-base text-primary-beige font-sans">
                  {organizerName}
                </Text>
                <Text className="text-primary-beige font-sansBold">
                  Ecologiste engagé
                </Text>
              </View>
            </View>
            <Text className="text-primary-green font-sansBold mx-4">
              {event.description}
            </Text>
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
            {!isOwner && !isEnrolled && (
              <View className="flex justify-center items-center mt-7 mb-10">
                <TouchableOpacity
                  className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6"
                  onPress={navigateToRegisterConfirmation}
                >
                  <Text className="font-sans text-lg text-primary-beige">
                    Je participe !
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {isEnrolled && !isOwner && (
              <View className="flex justify-center items-center mt-7 mb-10">
                <TouchableOpacity className="flex-row items-center justify-center w-5/6 rounded-full bg-primary-yellow p-4">
                  <Text className="font-sans text-primary-beige text-xl mr-3">
                    Accès au QR Code
                  </Text>
                  <Ionicons name="qr-code" size={24} color="#FFF3E6" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex items-center justify-center w-5/6 mt-4"
                  onPress={handleCancelParticipation}
                >
                  <Text className="font-sans text-primary-red">
                    Je ne souhaite plus participer à cet événement
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            {isOwner && (
              <View className="flex justify-center items-center mt-7 mb-10">
                <TouchableOpacity className="flex-row items-center justify-center w-5/6 rounded-full bg-primary-yellow p-4">
                  <Text className="font-sans text-primary-beige text-xl mr-3">
                    Accès au QR Code
                  </Text>
                  <Ionicons name="qr-code" size={24} color="#FFF3E6" />
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex items-center justify-center w-5/6 mt-4"
                  onPress={handleUpdateEvent}
                >
                  <Text className="font-sansBold text-xl text-secondary-yellow">
                    Modifier l'évènement
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
      <UpdateCreatedEvent
        visible={updateModalVisible}
        onRequestClose={() => setUpdateModalVisible(false)}
        event={event}
      />
    </>
  );
};

export default JoinEventsModal;
