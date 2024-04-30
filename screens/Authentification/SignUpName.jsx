import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const db = getFirestore();

const SignUpName = ({ route }) => {
  const { email, password } = route.params;
  const [firstName, setFirstName] = useState("");
  const [username, setUsername] = useState("");

  const createAccount = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Une fois que l'utilisateur est créé, mets à jour son profil avec le prénom et le pseudonyme
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            // Une fois que le profil est mis à jour, ajoute les informations de l'utilisateur à la base de données
            const userDoc = doc(db, "users", user.uid);
            setDoc(userDoc, {
              email: email,
              firstName: firstName,
              username: username,
            })
              .then(() => {
                // Redirige l'utilisateur vers la page d'accueil
                navigation.navigate("HomeScreen");
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
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Gérer ici les erreurs de création d'utilisateur
        console.error(
          "Erreur lors de la création de l'utilisateur :",
          errorMessage
        );
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
