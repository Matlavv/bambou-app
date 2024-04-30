import React, { useContext } from "react";
import { Button, Text, View } from "react-native";
import { AuthContext } from "../AuthContext";
import { doc } from "firebase/firestore";

const HomeScreen = () => {
  const { signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>HomeScreen</Text>
      <Button title="Déconnexion" onPress={() => signOut()} />
    </View>
  );
};

export default HomeScreen;
