import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const CreateEventModal = ({ visible, onRequestClose }) => {
  const [accessibility, setAccessibility] = useState("oui");
  const [eventType, setEventType] = useState("type1");
  const navigation = useNavigation();

  const navigateToCreateEventConfirmation = () => {
    navigation.navigate("CreateEventConfirmation");
  };

  return (
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
          <Text className="text-4xl text-primary-green font-wakBold mt-10 mx-4 ">
            Créer un événement
          </Text>
          {/* Form */}
          <View className="mx-4">
            <Text className="text-xl text-primary-green font-sans mt-10">
              Nom de l'événement
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 text-lg"
              placeholder="Nom"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Type d'événement
            </Text>
            <View className="bg-secondary-beige rounded-xl mt-2">
              <Picker
                selectedValue={eventType}
                onValueChange={(itemValue, itemIndex) =>
                  setEventType(itemValue)
                }
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
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Lieu
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 text-lg"
              placeholder="Rechercher une ville"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Description
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 h-28 text-lg"
              placeholder="Dis nous en plus sur l'événement !"
              textAlignVertical="top"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Accessible aux personnes en situation de handicap ?
            </Text>
            <View className="bg-secondary-beige rounded-xl mt-2">
              <Picker
                selectedValue={accessibility}
                onValueChange={(itemValue, itemIndex) =>
                  setAccessibility(itemValue)
                }
                style={{ color: "#005B41" }}
              >
                <Picker.Item label="Oui" value="Oui" />
                <Picker.Item label="Non" value="Non" />
              </Picker>
            </View>
          </View>
          <TouchableOpacity
            className="bg-primary-yellow p-4 rounded-full my-7 mx-4"
            onPress={() => {
              onRequestClose();
              navigateToCreateEventConfirmation();
            }}
          >
            <Text className="text-xl text-white text-center font-sansBold">
              Créer mon événement !
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};

export default CreateEventModal;
