import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import React, { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { app } from "../../../firebaseConfig";

const EditPassword = () => {
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [currentPasswordVisible, setCurrentPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmNewPasswordVisible, setConfirmNewPasswordVisible] =
    useState(false);

  const auth = getAuth(app);
  const user = auth.currentUser;

  const handleSave = () => {
    if (newPassword !== confirmNewPassword) {
      Alert.alert("Erreur", "Les nouveaux mots de passe ne correspondent pas.");
      return;
    }

    if (user && currentPassword) {
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updatePassword(user, newPassword)
            .then(() => {
              Alert.alert("Succès", "Mot de passe mis à jour avec succès.");
              navigation.goBack();
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la mise à jour du mot de passe: ",
                error
              );
              Alert.alert(
                "Erreur",
                "Une erreur s'est produite lors de la mise à jour du mot de passe."
              );
            });
        })
        .catch((error) => {
          console.error("Erreur lors de la réauthentification: ", error);
          Alert.alert("Erreur", "Le mot de passe actuel est incorrect.");
        });
    } else {
      Alert.alert("Erreur", "Veuillez entrer le mot de passe actuel.");
    }
  };

  return (
    <View>
      <View className="flex-row mt-14 ml-4">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Mot de passe
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-primary-green mx-5 text-base font-sansBold mt-4">
          Pour définir un nouveau mot de passe, indique d’abord ton mot de passe
          actuel.
        </Text>
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton mot de passe actuel
        </Text>
        <View className="flex-row items-center w-92 bg-secondary-beige rounded-2xl mx-4">
          <TextInput
            className="flex-1 text-primary-green p-4 font-sansBold"
            placeholder="Ton mot de passe"
            secureTextEntry={!currentPasswordVisible}
            value={currentPassword}
            onChangeText={setCurrentPassword}
          />
          <TouchableOpacity
            onPress={() => setCurrentPasswordVisible(!currentPasswordVisible)}
            style={{ padding: 10 }}
          >
            <Ionicons
              name={currentPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#005B41"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton nouveau mot de passe
        </Text>
        <View className="flex-row items-center w-92 bg-secondary-beige rounded-2xl mx-4">
          <TextInput
            className="flex-1 text-primary-green p-4 font-sansBold"
            placeholder="Ton mot de passe"
            secureTextEntry={!newPasswordVisible}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity
            onPress={() => setNewPasswordVisible(!newPasswordVisible)}
            style={{ padding: 10 }}
          >
            <Ionicons
              name={newPasswordVisible ? "eye-off-outline" : "eye-outline"}
              size={24}
              color="#005B41"
            />
          </TouchableOpacity>
        </View>
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Confirme ton nouveau mot de passe
        </Text>
        <View className="flex-row items-center w-92 bg-secondary-beige rounded-2xl mx-4">
          <TextInput
            className="flex-1 text-primary-green p-4 font-sansBold"
            placeholder="Ton mot de passe"
            secureTextEntry={!confirmNewPasswordVisible}
            value={confirmNewPassword}
            onChangeText={setConfirmNewPassword}
          />
          <TouchableOpacity
            onPress={() =>
              setConfirmNewPasswordVisible(!confirmNewPasswordVisible)
            }
            style={{ padding: 10 }}
          >
            <Ionicons
              name={
                confirmNewPasswordVisible ? "eye-off-outline" : "eye-outline"
              }
              size={24}
              color="#005B41"
            />
          </TouchableOpacity>
        </View>
        <View className="flex justify-between items-center">
          <TouchableOpacity
            className="flex bg-primary-yellow p-3 rounded-full mt-10 w-1/2"
            onPress={handleSave}
          >
            <Text className="text-white text-lg font-sans text-center">
              Enregistrer
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default EditPassword;
