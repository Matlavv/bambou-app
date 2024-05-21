import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { app } from "../../../firebaseConfig";

const EditUsername = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const userDoc = doc(db, "users", userId);
      getDoc(userDoc)
        .then((doc) => {
          if (doc.exists()) {
            setUsername(doc.data().username);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [userId]);

  const handleSave = () => {
    if (userId && newUsername) {
      const userDoc = doc(db, "users", userId);
      updateDoc(userDoc, { username: newUsername })
        .then(() => {
          Alert.alert(
            "Réussi",
            "Votre nom d'utilisateur a été mis à jour avec succès"
          );
          setUsername(newUsername);
        })
        .catch((error) => {
          console.error("Erreur dans la modification: ", error);
          Alert.alert(
            "Erreur",
            "Il y a eu une erreur lors de la mise à jour de votre nom d'utilisateur"
          );
        });
    }
  };

  return (
    <View>
      <View className="flex-row mt-14 ml-4">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Nom d'utilisateur
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton nom d'utilisateur
        </Text>
        <TextInput
          className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4"
          placeholder={username}
          value={newUsername}
          onChangeText={setNewUsername}
        />
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

export default EditUsername;
