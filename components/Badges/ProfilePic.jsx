import { useFocusEffect, useNavigation } from "@react-navigation/core";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import React, { useCallback, useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { app } from "../../firebaseConfig";

const ProfilePic = () => {
  const navigation = useNavigation();
  const [userProfilePic, setUserProfilePic] = useState("");

  const navigateToProfile = () => {
    navigation.navigate("Profile");
  };

  const auth = getAuth(app);
  const db = getFirestore(app);
  const user = auth.currentUser;

  const fetchUserProfile = useCallback(async () => {
    if (user) {
      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);
      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUserProfilePic({ uri: userData.profilePic });
      }
    }
  }, [user, db]);

  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [fetchUserProfile])
  );

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
