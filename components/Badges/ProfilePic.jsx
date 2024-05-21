import { useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { profilePic } from "../../assets";
import { app } from "../../firebaseConfig";

const ProfilePic = () => {
  const navigation = useNavigation();
  const [userProfilePic, setUserProfilePic] = useState(profilePic);

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

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
          setUserProfilePic({ uri: userData.profilePic });
        }
      }
    };

    fetchUserProfile();
  }, [user]);

  return (
    <View>
      <TouchableOpacity onPress={navigateToProfile}>
        <Image
          source={userProfilePic}
          alt="profilePic"
          className="rounded-full w-20 h-20"
        />
      </TouchableOpacity>
    </View>
  );
};

export default ProfilePic;
