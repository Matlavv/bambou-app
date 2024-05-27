import { Ionicons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  increment,
  onSnapshot,
  query,
  updateDoc,
  where,
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
  const [vouchers, setVouchers] = useState([]);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
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

    const fetchVouchers = async () => {
      if (partner) {
        const vouchersCollection = collection(
          db,
          "partners",
          partner.id,
          "vouchers"
        );
        const vouchersQuery = query(
          vouchersCollection,
          where("status", "==", true)
        );
        const vouchersSnapshot = await getDocs(vouchersQuery);
        const vouchersList = vouchersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setVouchers(vouchersList);
      }
    };

    fetchVouchers();
    const unsubscribeUserCredits = fetchUserCredits();

    return () => unsubscribeUserCredits();
  }, [partner, user]);

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
  };

  const handleRedeemVoucher = async () => {
    if (!selectedVoucher) {
      Alert.alert("Veuillez sélectionner un bon de réduction.");
      return;
    }

    if (userCredits < selectedVoucher.costInCredits) {
      Alert.alert("Crédits insuffisants", "Vous n'avez pas assez de crédits.");
      return;
    }

    try {
      const userDoc = doc(db, "users", user.uid);
      const voucherDoc = doc(
        db,
        "partners",
        partner.id,
        "vouchers",
        selectedVoucher.id
      );

      await updateDoc(userDoc, {
        credits: increment(-selectedVoucher.costInCredits),
      });

      await updateDoc(voucherDoc, {
        status: false,
      });

      setRedeemedCode(selectedVoucher.code);

      Alert.alert(
        "Bon de réduction récupéré !",
        `Votre code : ${selectedVoucher.code}.`
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
          {/* Vouchers */}
          <FlatList
            data={vouchers}
            keyExtractor={(item) => item.id}
            renderItem={({ item: voucher }) => (
              <View className="flex-row justify-between bg-secondary-beige p-4 rounded-xl mt-4 items-center">
                <RadioButton
                  selected={selectedVoucher?.id === voucher.id}
                  onPress={() => handleVoucherSelect(voucher)}
                />
                <View className="flex-row items-center">
                  <Text className="text-lg text-primary-green font-sansBold">
                    {voucher.amount}€ de remise
                  </Text>
                </View>
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full">
                  <Text className="text-primary-beige text-lg font-wakBold">
                    {voucher.costInCredits}
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
