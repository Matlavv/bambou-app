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
import { app } from "../../firebaseConfig";
import TradeDonationPointsModal from "../../screens/Gifts/TradeDonationPointsModal";

const AssociationsList = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAssociation, setSelectedAssociation] = useState(null);
  const [associations, setAssociations] = useState([]);
  const [userCredits, setUserCredits] = useState(0);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchAssociations = async () => {
      const associationsCollection = collection(db, "associations");
      const associationsSnapshot = await getDocs(associationsCollection);
      const associationsList = associationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAssociations(associationsList);
    };

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

    fetchAssociations();
    const unsubscribeUserCredits = fetchUserCredits();

    return () => unsubscribeUserCredits();
  }, [user]);

  const openModal = (association) => {
    setSelectedAssociation(association);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <FlatList
        data={associations}
        keyExtractor={(item) => item.id}
        renderItem={({ item: association }) => (
          <TouchableOpacity
            className="flex-row items-center bg-secondary-beige p-3 rounded-xl mx-5 my-2"
            onPress={() => openModal(association)}
          >
            <Image
              source={{ uri: association.logo }}
              className="w-16 h-16"
              alt="brand logo"
            />
            <View className="ml-4">
              <Text className="text-primary-green font-sans text-lg">
                {association.name}
              </Text>
              <View className="flex-row items-center w-5/6">
                <Text className="text-primary-green font-sansBold">
                  {association.description}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
      <TradeDonationPointsModal
        visible={modalVisible}
        onRequestClose={closeModal}
        association={selectedAssociation}
        userCredits={userCredits}
        onDonationComplete={() => {}}
      />
    </View>
  );
};

export default AssociationsList;
