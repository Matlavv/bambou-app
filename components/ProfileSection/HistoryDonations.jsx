import { getAuth } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { app } from "../../firebaseConfig";

const HistoryDonations = () => {
  const [donations, setDonations] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchDonations = async () => {
      if (user) {
        const donationsCollection = collection(db, "donationHistory");
        const donationsQuery = query(
          donationsCollection,
          where("userId", "==", user.uid)
        );
        const donationsSnapshot = await getDocs(donationsQuery);
        const donationsList = donationsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Fetch association details for each donation
        const donationsWithAssociations = await Promise.all(
          donationsList.map(async (donation) => {
            const associationDoc = await getDoc(
              doc(db, "associations", donation.associationId)
            );
            if (associationDoc.exists()) {
              const associationData = associationDoc.data();
              return {
                ...donation,
                associationName: associationData.name,
                associationLogo: associationData.logo,
              };
            }
            return donation;
          })
        );

        setDonations(donationsWithAssociations);
      }
    };

    fetchDonations();
  }, [user]);

  return (
    <ScrollView className="mt-4">
      {donations.map((donation) => (
        <View
          key={donation.id}
          className="flex-row bg-secondary-beige rounded-2xl mx-4 my-2 p-4 items-center"
        >
          <Image
            source={{ uri: donation.associationLogo }}
            className="w-16 h-16 rounded-full"
            alt="brand logo"
          />
          <View className="ml-6 flex-1">
            <Text className="text-lg text-primary-green font-sans">
              {donation.associationName}
            </Text>
            <Text className="text-lg text-primary-green font-sans">
              {new Date(
                donation.donationDate.seconds * 1000
              ).toLocaleDateString()}
            </Text>
          </View>
          <Text className="text-2xl text-primary-green font-sans">
            {donation.amount}€
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default HistoryDonations;
