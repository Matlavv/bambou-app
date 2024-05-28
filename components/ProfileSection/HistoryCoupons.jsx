import { getAuth } from "firebase/auth";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { app } from "../../firebaseConfig";

const HistoryCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchCoupons = async () => {
      if (user) {
        const couponsCollection = collection(db, "users", user.uid, "vouchers");
        const couponsSnapshot = await getDocs(couponsCollection);
        const couponsList = couponsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCoupons(couponsList);
      }
    };

    fetchCoupons();
  }, [user]);

  return (
    <ScrollView className="m-4">
      {coupons.map((coupon) => (
        <View
          key={coupon.id}
          className="bg-secondary-beige flex-row p-4 rounded-2xl flex items-center my-2"
        >
          <Image
            source={{ uri: coupon.partnerLogo }}
            className="w-16 h-16 mr-6 rounded-full"
            alt="brand logo"
          />
          <View className="">
            <Text className="text-lg text-primary-green font-sans">
              Bon de reduction de {coupon.amount}€
            </Text>
            <Text className="text-base text-primary-green font-sans">
              Valide jusqu'au{" "}
              {new Date(coupon.expiresAt.seconds * 1000).toLocaleDateString()}
            </Text>
            <View className="bg-primary-beige rounded-2xl flex items-center justify-center mt-2">
              <Text className="text-2xl text-primary-green font-sans">
                {coupon.code}
              </Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default HistoryCoupons;
