import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, sendEmailVerification, updateEmail } from "firebase/auth";
import { doc, getDoc, getFirestore, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { app } from "../../../firebaseConfig";

const EditEmail = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const userDoc = doc(db, "users", userId);
      getDoc(userDoc)
        .then((doc) => {
          if (doc.exists()) {
            setEmail(doc.data().email);
          }
        })
        .catch((error) => {
          console.error(
            "Erreur lors de la récupération des données utilisateur: ",
            error
          );
        });
    }
  }, [userId]);

  const handleSave = () => {
    if (userId && newEmail) {
      const user = auth.currentUser;

      sendEmailVerification(user)
        .then(() => {
          Alert.alert(
            "Succès",
            "Email de vérification envoyé. Veuillez vérifier votre email."
          );

          // Permettre à l'utilisateur de modifier l'e-mail dans Firestore et Firebase Auth
          const userDoc = doc(db, "users", userId);

          // Mettre à jour l'adresse e-mail dans Firestore
          updateDoc(userDoc, { email: newEmail })
            .then(() => {
              // Mettre à jour l'adresse e-mail dans l'authentification Firebase
              updateEmail(user, newEmail)
                .then(() => {
                  Alert.alert(
                    "Succès",
                    "Adresse email mise à jour avec succès."
                  );
                  setEmail(newEmail);
                })
                .catch((error) => {
                  console.error(
                    "Erreur lors de la mise à jour de l'email dans l'auth: ",
                    error
                  );
                  Alert.alert(
                    "Erreur",
                    "Une erreur s'est produite lors de la mise à jour de l'adresse email dans l'authentification."
                  );
                });
            })
            .catch((error) => {
              console.error(
                "Erreur lors de la mise à jour de l'email dans Firestore: ",
                error
              );
              Alert.alert(
                "Erreur",
                "Une erreur s'est produite lors de la mise à jour de l'adresse email dans Firestore."
              );
            });
        })
        .catch((error) => {
          console.error(
            "Erreur lors de l'envoi de l'email de vérification: ",
            error
          );
          Alert.alert("Erreur", "Échec de l'envoi de l'email de vérification.");
        });
    } else {
      Alert.alert("Erreur", "Veuillez entrer la nouvelle adresse email.");
    }
  };

  return (
    <View>
      <View className="flex-row mt-14 ml-4">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Adresse mail
        </Text>
      </View>
      <View className="mt-4">
        <Text className="text-primary-green ml-5 text-lg font-sans mt-4">
          Ton email
        </Text>
        <TextInput
          className="text-primary-green bg-secondary-beige p-3 rounded-2xl mt-2 mx-4"
          placeholder={email}
          value={newEmail}
          onChangeText={setNewEmail}
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

export default EditEmail;
