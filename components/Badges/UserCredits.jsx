import { getAuth } from "firebase/auth";
import { doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { credits } from "../../assets";
import { app } from "../../firebaseConfig";

const UserCredits = () => {
  const [userCredits, setUserCredits] = useState(0);

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const unsubscribe = onSnapshot(userDoc, (doc) => {
        if (doc.exists()) {
          const userData = doc.data();
          setUserCredits(userData.credits);
        }
      });

      // Cleanup subscription on unmount
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <View>
      <View className="bg-primary-yellow p-1 rounded-3xl w-20">
        <View className="flex flex-row items-center justify-center">
          <Text className="text-primary-beige font-wakBold text-base">
            {userCredits}
          </Text>
          <Image source={credits} alt="credits" className="m-1" />
        </View>
      </View>
    </View>
  );
};

export default UserCredits;
