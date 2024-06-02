import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import {
  Timestamp,
  addDoc,
  collection,
  getFirestore,
} from "firebase/firestore";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { app } from "../../firebaseConfig";

const CreateEventModal = ({ visible, onRequestClose }) => {
  const [accessibility, setAccessibility] = useState("Oui");
  const [eventType, setEventType] = useState("Collecte de dechets");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleAddressChange = async (text) => {
    setQuery(text);
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${text}&components=country:fr&key=${apiKey}`
    );
    const json = await response.json();
    setPredictions(json.predictions);
  };

  const handlePredictionSelect = async (placeId) => {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${apiKey}`
    );
    const json = await response.json();
    const place = json.result;

    // Vérifiez si l'adresse est en France
    const isInFrance = place.address_components.some(
      (component) =>
        component.types.includes("country") && component.short_name === "FR"
    );

    if (!isInFrance) {
      Alert.alert("Erreur", "L'adresse sélectionnée doit être en France.");
      return;
    }

    setSelectedPlace({
      address: place.formatted_address,
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
    });
    setQuery(place.formatted_address);
    setPredictions([]);
  };

  const navigateToCreateEventConfirmation = () => {
    navigation.navigate("CreateEventConfirmation");
  };

  const handleCreateEvent = async () => {
    const user = auth.currentUser;
    if (!user) return;

    // Validation des champs
    if (!title || !eventType || !date || !description || !selectedPlace) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    // Vérifier si l'adresse est en France
    if (!selectedPlace.address.includes("France")) {
      Alert.alert("Erreur", "L'adresse de l'événement doit être en France.");
      return;
    }

    try {
      await addDoc(collection(db, "events"), {
        title,
        type: eventType,
        date,
        address: selectedPlace.address,
        description,
        accessibility,
        userId: user.uid,
        participants: [],
        latitude: selectedPlace.latitude,
        longitude: selectedPlace.longitude,
        isActive: true,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now(),
      });
      onRequestClose();
      navigateToCreateEventConfirmation();
    } catch (error) {
      console.error("Error creating event: ", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <SafeAreaView className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <View className="bg-primary-beige flex-1">
            <TouchableOpacity
              className="absolute right-2 p-3"
              onPress={onRequestClose}
            >
              <Ionicons name="close" size={42} color="#005B41" />
            </TouchableOpacity>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text className="text-4xl text-primary-green font-wakBold mt-10 mx-4 ">
                Créer un événement
              </Text>
              <View className="mx-4 flex-1">
                <Text className="text-xl text-primary-green font-sans mt-10">
                  Nom de l'événement
                </Text>
                <TextInput
                  className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 text-lg"
                  placeholder="Nom"
                  value={title}
                  onChangeText={setTitle}
                />
                <Text className="text-xl text-primary-green font-sans mt-5">
                  Type d'événement
                </Text>
                <View className="bg-secondary-beige rounded-xl mt-2">
                  <Picker
                    selectedValue={eventType}
                    onValueChange={(itemValue) => setEventType(itemValue)}
                    style={{ color: "#005B41" }}
                  >
                    <Picker.Item
                      label="Collecte de dechets"
                      value="Collecte de dechets"
                    />
                    <Picker.Item
                      label="Nettoyage d'espace public"
                      value="Nettoyage d'espace public"
                    />
                    <Picker.Item
                      label="Sensibilisation au recyclage"
                      value="Sensibilisation au recyclage"
                    />
                  </Picker>
                </View>
                <Text className="text-xl text-primary-green font-sans mt-5">
                  Date et heure
                </Text>
                <TextInput
                  className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 text-lg"
                  placeholder="Date et heure"
                  value={date}
                  onChangeText={setDate}
                />
                <Text className="text-xl text-primary-green font-sans mt-5">
                  Adresse
                </Text>
                <View className="bg-secondary-beige p-2 rounded-xl">
                  <TextInput
                    className="text-primary-green font-sansBold my-1 text-lg"
                    placeholder="Adresse"
                    value={query}
                    onChangeText={handleAddressChange}
                  />
                  {predictions.length > 0 && (
                    <FlatList
                      data={predictions}
                      keyExtractor={(item) => item.place_id}
                      renderItem={({ item }) => (
                        <TouchableOpacity
                          onPress={() => handlePredictionSelect(item.place_id)}
                        >
                          <Text className="text-primary-green font-sansBold my-1">
                            {item.description}
                          </Text>
                        </TouchableOpacity>
                      )}
                      style={{ maxHeight: 150 }}
                    />
                  )}
                </View>
                <Text className="text-xl text-primary-green font-sans mt-5">
                  Description
                </Text>
                <TextInput
                  className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 h-28 text-lg"
                  placeholder="Dis nous en plus sur l'événement !"
                  textAlignVertical="top"
                  value={description}
                  onChangeText={setDescription}
                />
                <Text className="text-xl text-primary-green font-sans mt-5">
                  Accessible aux personnes en situation de handicap ?
                </Text>
                <View className="bg-secondary-beige rounded-xl mt-2">
                  <Picker
                    selectedValue={accessibility}
                    onValueChange={(itemValue) => setAccessibility(itemValue)}
                    style={{ color: "#005B41" }}
                  >
                    <Picker.Item label="Oui" value="Oui" />
                    <Picker.Item label="Non" value="Non" />
                  </Picker>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity
              className="bg-primary-yellow p-4 rounded-full my-7 mx-4"
              onPress={handleCreateEvent}
            >
              <Text className="text-xl text-white text-center font-sansBold">
                Créer mon événement !
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateEventModal;
