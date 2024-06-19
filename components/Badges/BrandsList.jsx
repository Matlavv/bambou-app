import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { bambooCoins } from "../../assets";
import { app } from "../../firebaseConfig";
import TradePointsModal from "../../screens/Gifts/TradePointsModal";

const BrandsList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [partners, setPartners] = useState([]);
  const [userCredits, setUserCredits] = useState(0);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  // Fetch partners
  useEffect(() => {
    const fetchPartners = async () => {
      const partnersCollection = collection(db, "partners");
      const partnersSnapshot = await getDocs(partnersCollection);
      const partnersList = partnersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPartners(partnersList);
    };

    // get user credits
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

    fetchPartners();
    const unsubscribeUserCredits = fetchUserCredits();

    return () => unsubscribeUserCredits();
  }, [user]);

  const openModal = (partner) => {
    setSelectedPartner(partner);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <FlatList
        data={partners}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item: partner }) => (
          <TouchableOpacity
            className="flex-row items-center bg-secondary-beige p-3 rounded-xl mx-5 my-2"
            onPress={() => openModal(partner)}
          >
            <Image
              source={{ uri: partner.logo }}
              className="w-16 h-16"
              alt="brand logo"
            />
            <View className="ml-4">
              <Text className="text-primary-green font-sans text-lg">
                {partner.name}
              </Text>
              <View className="flex-row items-center">
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full my-1">
                  <Text className="text-primary-beige font-wakBold text-lg">
                    {partner.points1}
                  </Text>
                  <Image source={bambooCoins} className="w-4 h-4 mx-1" />
                </View>
                <View className="flex-row items-center bg-primary-yellow px-2 rounded-full my-1 mx-2">
                  <Text className="text-primary-beige text-lg font-wakBold">
                    {partner.points2}
                  </Text>
                  <Image
                    source={bambooCoins}
                    className="w-4 h-4 mx-1"
                    alt="coin"
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TradePointsModal
        visible={modalVisible}
        onRequestClose={closeModal}
        partner={selectedPartner}
        userCredits={userCredits}
      />
    </View>
  );
};

export default BrandsList;
