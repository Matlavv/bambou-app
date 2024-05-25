import { getAuth } from "firebase/auth";
import { doc, getFirestore, increment, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, Modal, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { app } from "../../firebaseConfig";

const TradeDonationPointsModal = ({
  visible,
  onRequestClose,
  association,
  userCredits,
  onDonationComplete,
}) => {
  const [credits, setCredits] = useState(userCredits);

  useEffect(() => {
    setCredits(userCredits); // Reset credits to user's available credits when the modal opens
  }, [visible, userCredits]);

  if (!association) return null;

  const handleAdd = () => {
    setCredits((prevCredits) => Math.min(prevCredits + 50, userCredits));
  };

  const handleRemove = () => {
    setCredits((prevCredits) =>
      prevCredits > 1000 ? prevCredits - 50 : prevCredits
    );
  };

  const calculatePrice = (credits) => {
    return (credits / 1000).toFixed(2);
  };

  const handleDonation = async () => {
    if (credits < 1000) {
      Alert.alert(
        "Erreur",
        "Vous devez donner au moins 1000 crédits pour faire un don."
      );
      return;
    }

    const auth = getAuth(app);
    const db = getFirestore(app);
    const user = auth.currentUser;

    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const associationDoc = doc(db, "associations", association.id);
      const donationAmount = parseFloat(calculatePrice(credits));

      try {
        // Mettre à jour les crédits de l'utilisateur et les champs de don
        await updateDoc(userDoc, {
          credits: increment(-credits),
          donations: increment(donationAmount),
        });

        await updateDoc(associationDoc, {
          donatedCounter: increment(donationAmount),
        });

        Alert.alert(
          "Merci pour votre don !",
          `Vous avez donné ${donationAmount}€ à ${association.name}.`,
          [
            {
              text: "OK",
              onPress: () => {
                onDonationComplete();
                onRequestClose();
              },
            },
          ]
        );
      } catch (error) {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de votre don. Veuillez réessayer."
        );
      }
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onRequestClose}
    >
      <View className="absolute inset-x-0 bottom-0 h-2/3 bg-primary-beige rounded-t-3xl flex flex-col justify-between">
        <View>
          <TouchableOpacity
            className="absolute right-2 p-3"
            onPress={onRequestClose}
          >
            <Ionicons name="close" size={42} color="#005B41" />
          </TouchableOpacity>
        </View>
        <View className="m-6 flex-1">
          <Text className="text-4xl text-primary-green font-wakExtraBold mt-4">
            {association.name}
          </Text>
          <View className="flex-row items-center w-5/6">
            <Text className="text-primary-green font-sansBold text-base">
              {association.fullDescription}
            </Text>
          </View>
          {/* Credits counter */}
          <View className="flex-row justify-center items-center mt-20">
            <TouchableOpacity
              className="bg-primary-yellow p-2 rounded-full mx-4"
              onPress={handleRemove}
            >
              <Ionicons name="remove" size={36} color="#FFF0E1" />
            </TouchableOpacity>
            <Text className="text-primary-green font-wakExtraBold text-7xl">
              {credits}
            </Text>
            <TouchableOpacity
              className="bg-primary-yellow p-2 rounded-full mx-4"
              onPress={handleAdd}
            >
              <Ionicons name="add" size={36} color="#FFF0E1" />
            </TouchableOpacity>
          </View>
          {/* Price display */}
          <View className="flex-row justify-center items-center mt-4">
            <Text className="text-primary-green font-sansBold text-xl">
              ({calculatePrice(credits)} €)
            </Text>
          </View>
        </View>
        <View className="flex justify-end items-center mb-5">
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6"
            onPress={handleDonation}
          >
            <Text className="font-sans text-lg text-primary-beige">
              Je donne !
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TradeDonationPointsModal;
