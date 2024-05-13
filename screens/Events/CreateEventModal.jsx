import { Ionicons } from "@expo/vector-icons";
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
import SelectDropdown from "react-native-select-dropdown";

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
          <Text className="text-4xl text-primary-green font-wakBold mt-10 mx-4">
            Créer un événement
          </Text>
          {/* Form */}
          <View className="mx-4">
            <Text className="text-xl text-primary-green font-sans mt-10">
              Nom de l'événement
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1"
              placeholder="Nom"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Type d'événement
            </Text>
            <SelectDropdown
              data={["Type 1", "Type 2"]}
              onSelect={(selectedItem, index) => {
                setEventType(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Date et heure
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1"
              placeholder="Date et heure"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Lieu
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1"
              placeholder="Rechercher une ville"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Description
            </Text>
            <TextInput
              className="bg-secondary-beige p-2 rounded-xl text-primary-green font-sansBold my-1 h-28"
              placeholder="Dis nous en plus sur l'événement !"
              textAlignVertical="top"
            />
            <Text className="text-xl text-primary-green font-sans mt-5">
              Accessible aux personnes en situation de handicap ?
            </Text>
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
