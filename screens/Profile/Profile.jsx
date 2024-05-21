import { Ionicons } from "@expo/vector-icons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { bambooCoins, profilePic } from "../../assets";
import MyBadges from "../../components/ProfileSection/MyBadges";
import MyPosts from "../../components/ProfileSection/MyPosts";
import { app } from "../../firebaseConfig";

const Profile = () => {
  const Tab = createMaterialTopTabNavigator();
  const navigation = useNavigation();
  const [userProfilePic, setUserProfilePic] = useState(null);
  const [username, setUsername] = useState("john_doe"); // valeur par défaut
  const [email, setEmail] = useState("");

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const userDoc = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserProfilePic(userData.profilePic || profilePic);
          setUsername(userData.username);
          setEmail(userData.email);
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  const navigateToSettings = () => {
    navigation.navigate("Settings");
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="bg-primary-green h-2/5">
        <TouchableOpacity
          className="absolute right-2 top-6 m-4"
          onPress={navigateToSettings}
        >
          <Ionicons name="settings-outline" size={32} color="white" />
        </TouchableOpacity>
        <View className="flex-row mt-24 mx-4">
          <Image
            source={userProfilePic ? { uri: userProfilePic } : profilePic}
            className="w-24 h-24 rounded-full"
            alt="profile pic"
          />
          <View className="m-4">
            <Text className="text-primary-beige font-sans text-2xl">
              {username}
            </Text>
            <View className="flex-row items-center mt-2">
              <Text className="text-primary-beige font-sansBold text-lg">
                <Text className="font-bold">23 </Text>
                abonnés |
              </Text>
              <Text className="text-primary-beige font-sansBold text-lg pl-2">
                <Text className="font-bold">56 </Text>
                abonnements
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row justify-around mt-4 m-2">
          <View className="flex-row items-center justify-center bg-primary-yellow rounded-2xl px-3 py-1 mx-1 flex-1">
            <Text className="font-wakExtraBold text-3xl text-primary-beige">
              150
            </Text>
            <Image
              source={bambooCoins}
              className="w-7 h-7 ml-1"
              alt="bamboo coins"
            />
          </View>
          <View className="flex items-center justify-center bg-primary-beige rounded-2xl px-3 py-1 mx-1 flex-1">
            <Text className="font-wakExtraBold text-3xl text-primary-green">
              25€
            </Text>
            <Text className="font-wak text-base text-primary-green">
              donnés
            </Text>
          </View>
          <View className="flex items-center justify-center bg-primary-red rounded-2xl px-3 py-1 mx-1 flex-1">
            <Text className="font-wakExtraBold text-3xl text-primary-beige">
              9
            </Text>
            <Text className="font-wak text-base text-primary-beige">
              participations
            </Text>
          </View>
        </View>
        <Text className="font-sansbold text-base m-4 text-primary-beige">
          Blabakbbakbakbabakbkabbakabkabkababkabbak lorem ipsum dolor sit amet
        </Text>
      </View>
      {/* Tab navigator */}
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "#005B41",
          tabBarInactiveTintColor: "#FFF0E1",
          tabBarStyle: { backgroundColor: "#005B41" },
          tabBarLabelStyle: { fontWeight: "bold" },
          tabBarIndicatorStyle: {
            backgroundColor: "#FFF0E1",
            height: 30,
            borderRadius: 15,
            marginVertical: 10,
            paddingHorizontal: 10,
          },
        }}
      >
        <Tab.Screen name="Mes publications" component={MyPosts} />
        <Tab.Screen name="Mes badges" component={MyBadges} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default Profile;
