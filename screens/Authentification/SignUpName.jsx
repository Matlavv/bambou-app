import { useNavigation } from "@react-navigation/native";
import { getAuth, updateProfile } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const db = getFirestore();

const SignUpName = ({ route }) => {
  const navigation = useNavigation();
  const { userId, email } = route.params;
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");

  const createAccount = () => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: username,
    })
      .then(() => {
        const userDoc = doc(db, "users", userId);
        setDoc(userDoc, {
          email: email,
          firstName: firstName,
          username: username,
        })
          .then(() => {
            navigation.navigate("Login");
          })
          .catch((error) => {
            console.error(
              "Erreur lors de l'enregistrement des données utilisateur :",
              error
            );
          });
      })
      .catch((error) => {
        console.error("Erreur lors de la mise à jour du profil :", error);
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <View className="items-center justify-center px-4 py-8 mb-3">
        <Text className="text-5xl text-primary-beige font-wakExtraBold text-center w-64">
          Dernière étape
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-5">
          Choisis ton pseudonyme, et c'est parti !
        </Text>
      </View>
      <View className="flex bg-primary-beige h-full">
        <View className="items-center p-12">
          <Text className="text-primary-green font-sans text-lg self-start">
            Prénom
          </Text>
          <TextInput
            className="font-sansBold w-80 bg-secondary-beige rounded-2xl p-4"
            placeholder="Ton prénom"
            onChangeText={setFirstName}
            value={firstName}
          />
          <Text className="text-primary-green font-sans text-lg self-start mt-5">
            Pseudonyme
          </Text>
          <TextInput
            className="font-sansBold w-80 bg-secondary-beige rounded-2xl p-4"
            placeholder="Ton pseudo"
            onChangeText={setUsername}
            value={username}
          />
        </View>
        <View className="w-full px-12 py-12 mt-56">
          <TouchableOpacity
            className="bg-primary-yellow py-4 rounded-full items-center w-full"
            onPress={createAccount}
          >
            <Text className="text-primary-beige text-lg font-sansBold">
              Créer mon compte !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUpName;
