import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { bambooCoins } from "../../assets";
import RadioButton from "../../components/Badges/RadioButton";
import { app } from "../../firebaseConfig";

const TradePointsModal = ({ visible, onRequestClose, partner }) => {
  const [voucherTypes, setVoucherTypes] = useState([]);
  const [selectedVoucherType, setSelectedVoucherType] = useState(null);
  const [userCredits, setUserCredits] = useState(0);
  const [redeemedCode, setRedeemedCode] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserCredits = () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        return onSnapshot(userDoc, (doc) => {
          if (doc.exists()) {
            const userData = doc.data();
            setUserCredits(userData.credits);
          }
        });
      }
      return () => {};
    };

    const fetchVoucherTypes = async () => {
      if (partner) {
        const vouchersCollection = collection(
          db,
          "partners",
          partner.id,
          "vouchers"
        );
        const vouchersSnapshot = await getDocs(vouchersCollection);
        const vouchersList = vouchersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVoucherTypes(vouchersList);
      }
    };

    fetchVoucherTypes();
    const unsubscribeUserCredits = fetchUserCredits();

    return () => unsubscribeUserCredits();
  }, [partner, user]);

  const handleVoucherTypeSelect = (voucherType) => {
    setSelectedVoucherType(voucherType);
  };

  const handleRedeemVoucher = async () => {
    if (!selectedVoucherType) {
      Alert.alert("Veuillez sélectionner un type de bon de réduction.");
      return;
    }

    if (userCredits < selectedVoucherType.costInCredits) {
      Alert.alert("Crédits insuffisants", "Vous n'avez pas assez de crédits.");
      return;
    }

    if (selectedVoucherType.codes.length === 0) {
      Alert.alert(
        "Codes non disponibles",
        "Il n'y a plus de codes disponibles pour ce bon de réduction."
      );
      return;
    }

    const codeToRedeem = selectedVoucherType.codes[0];

    try {
      const userDoc = doc(db, "users", user.uid);
      const voucherTypeDoc = doc(
        db,
        "partners",
        partner.id,
        "vouchers",
        selectedVoucherType.id
      );
      const userVoucherDoc = doc(collection(db, "users", user.uid, "vouchers"));

      // Mettre à jour les crédits de l'utilisateur
      await updateDoc(userDoc, {
        credits: increment(-selectedVoucherType.costInCredits),
      });

      // Mettre à jour le type de bon pour supprimer le code utilisé
      await updateDoc(voucherTypeDoc, {
        codes: arrayRemove(codeToRedeem),
      });

      // Ajouter le bon échangé à la sous-collection de l'utilisateur
      await setDoc(userVoucherDoc, {
        code: codeToRedeem,
        amount: selectedVoucherType.amount,
        redeemedAt: new Date(),
        partnerId: partner.id,
        expiresAt: selectedVoucherType.expiresAt.toDate(),
        partnerLogo: partner.logo,
      });

      setRedeemedCode(codeToRedeem);

      Alert.alert(
        "Bon de réduction récupéré !",
        `Votre code : ${codeToRedeem}.`
      );
    } catch (error) {
      console.error("Error redeeming voucher: ", error);
      Alert.alert("Erreur", "Une erreur est survenue. Veuillez réessayer.");
    }
  };

  if (!partner) return null;

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
          <Image
            source={{ uri: partner.logo }}
            className="w-16 h-16 rounded-full"
            alt="brand logo"
          />
          <Text className="text-4xl text-primary-green font-wakExtraBold mt-2">
            {partner.name}
          </Text>
          {/* Voucher Types */}
          <FlatList
            data={voucherTypes}
            keyExtractor={(item) => item.id}
            renderItem={({ item: voucherType }) => (
              <View className="flex-row justify-between bg-secondary-beige p-4 rounded-xl mt-4 items-center">
                <RadioButton
                  selected={selectedVoucherType?.id === voucherType.id}
                  onPress={() => handleVoucherTypeSelect(voucherType)}
                />
                <View className="flex-row items-center">
                  <Text className="text-lg text-primary-green font-sansBold">
                    {voucherType.amount}€ de remise
                  </Text>
                </View>
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full">
                  <Text className="text-primary-beige text-lg font-wakBold">
                    {voucherType.costInCredits}
                  </Text>
                  <Image source={bambooCoins} className="w-4 h-4 mx-1" />
                </View>
              </View>
            )}
          />
          {redeemedCode ? (
            <View className="mt-6 p-4 bg-secondary-beige rounded-xl">
              <Text className="text-lg text-primary-green font-sansBold">
                Code récupéré :
              </Text>
              <TextInput
                value={redeemedCode}
                editable={false}
                className="text-lg text-primary-green font-sansBold mt-2"
              />
              <TouchableOpacity
                className="bg-primary-yellow p-2 rounded-full mt-2"
                onPress={() => {
                  Alert.alert(
                    "Code copié",
                    "Le code a été copié dans votre presse-papiers."
                  );
                }}
              >
                <Text className="text-center text-primary-beige font-sansBold">
                  Copier le code
                </Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <View className="flex justify-end items-center mb-5">
          <TouchableOpacity
            className="flex items-center justify-center bg-primary-yellow p-3 px-6 rounded-full w-5/6"
            onPress={handleRedeemVoucher}
          >
            <Text className="font-sans text-lg text-primary-beige">
              Je récupère le code
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TradePointsModal;
