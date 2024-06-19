import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import HistoryCoupons from "../../../components/ProfileSection/HistoryCoupons";
import HistoryDonations from "../../../components/ProfileSection/HistoryDonations";
import { app } from "../../../firebaseConfig";

const Tab = createMaterialTopTabNavigator();

const History = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [newUsername, setNewUsername] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    if (userId) {
      const userDoc = doc(db, "users", userId);
      getDoc(userDoc)
        .then((doc) => {
          if (doc.exists()) {
            setUsername(doc.data().username);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data: ", error);
        });
    }
  }, [userId]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-row mt-14 ml-4 mb-6">
        <TouchableOpacity className="mt-1" onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={30} color="#005B41" />
        </TouchableOpacity>
        <Text className="text-4xl font-wakExtraBold text-primary-green ml-4">
          Mes codes promos et donations
        </Text>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#005B41",
          tabBarInactiveTintColor: "#005B41",
          tabBarStyle: { backgroundColor: "#FFF0E1" },
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#F2DCC8",
            height: 30,
            borderRadius: 15,
            marginVertical: 10,
            paddingHorizontal: 10,
          },
        }}
      >
        <Tab.Screen name="Coupons" component={HistoryCoupons} />
        <Tab.Screen name="Dons" component={HistoryDonations} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default History;
