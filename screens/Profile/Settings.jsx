import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { profilePic } from "../../assets";

const Settings = () => {
  const navigation = useNavigation();
  const [isTTSenabled, setIsTTSenabled] = useState(false);
  const [textSize, setTextSize] = useState(0.5);

  const navigateToEditUsername = () => {
    navigation.navigate("EditUsername");
  };

  const navigateToEditEmail = () => {
    navigation.navigate("EditEmail");
  };

  const navigateToEditPassword = () => {
    navigation.navigate("EditPassword");
  };

  return (
    <SafeAreaView className="flex-1">
      <ScrollView className="bg-primary-beige">
        <TouchableOpacity
          className="absolute right-2 top-2 p-3 mt-6"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="close" size={42} color="#005B41" />
        </TouchableOpacity>
        <Text className="font-wakBold text-5xl text-primary-green mt-20 mx-4">
          Paramètres
        </Text>
        <Text className="text-primary-green text-lg font-sans mx-4 mt-2">
          Mon compte
        </Text>
        <View className="w-10 mt-3">
          <Image source={profilePic} className="w-24 h-24 rounded-full ml-4" />
          <TouchableOpacity className="bg-secondary-beige rounded-full p-2 absolute left-20 bottom-0">
            <FontAwesome name="pencil-square-o" size={24} color="#005B41" />
          </TouchableOpacity>
        </View>
        <View className="m-4">
          <TouchableOpacity
            className="flex bg-secondary-beige p-3 rounded-2xl flex-row justify-between items-center"
            onPress={navigateToEditUsername}
          >
            <View>
              <Text className="text-primary-green ml-2 text-lg font-sans">
                Nom d'utilisateur
              </Text>
              <Text className="text-primary-green ml-2 text-base">
                john_doe
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex bg-secondary-beige p-3 rounded-2xl mt-2 flex-row justify-between items-center"
            onPress={navigateToEditEmail}
          >
            <View>
              <Text className="text-primary-green ml-2 text-lg font-sans">
                Adresse email
              </Text>
              <Text className="text-primary-green ml-2 text-base">
                mathis.laversin@gmail.com
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex bg-secondary-beige p-3 rounded-2xl mt-2 flex-row justify-between items-center"
            onPress={navigateToEditPassword}
          >
            <Text className="text-primary-green ml-2 text-lg font-sans">
              Mot de passe
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl mt-2 flex-row justify-between items-center">
            <Text className="text-primary-green ml-2 text-lg font-sans">
              Certification
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl mt-2 flex-row justify-between items-center">
            <Text className="text-primary-green ml-2 text-lg font-sans">
              Abonnement premium
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <Text className="text-primary-green ml-2 text-xl font-sans mt-5">
            Accessibilité
          </Text>
          <Text className="text-primary-green ml-2 text-lg font-sans mt-4">
            Taille des textes
          </Text>
          {/* progress bar here */}
          <View className="mx-4 mt-2">
            <Slider
              minimumValue={0}
              maximumValue={1}
              value={textSize}
              onValueChange={(value) => setTextSize(value)}
              minimumTrackTintColor="#005B41"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#005B41"
            />
          </View>
          <View className="flex-row justify-between items-center mt-4 mx-4">
            <Text className="text-primary-green text-lg font-sans">
              Synthèse vocale
            </Text>
            <Switch
              value={isTTSenabled}
              onValueChange={() => setIsTTSenabled(!isTTSenabled)}
              trackColor={{ false: "#d3d3d3", true: "#005B41" }}
              thumbColor={isTTSenabled ? "#f4f3f4" : "#f4f3f4"}
            />
          </View>
          <Text className="text-primary-green ml-2 text-xl font-sans mt-4">
            Actions sur le compte
          </Text>
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl mt-4 flex-row justify-between items-center">
            <Text className="text-primary-green ml-2 text-lg font-sans">
              Supprimer mon compte
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
          <TouchableOpacity className="flex bg-secondary-beige p-3 rounded-2xl mt-2 flex-row justify-between items-center">
            <Text className="text-primary-green ml-2 text-lg font-sans">
              Déconnexion
            </Text>
            <Ionicons name="chevron-forward" size={24} color="#005B41" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
