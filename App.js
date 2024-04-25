import * as Font from "expo-font";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

async function loadFonts() {
  await Font.loadAsync({
    "GillSans-Regular": require("./assets/fonts/gill-sans1.ttf"),
    "GillSans-Bold": require("./assets/fonts/gill-sans-2.ttf"),
    "Wak-Light": require("./assets/fonts/wak-light.otf"),
    "Wak-Medium": require("./assets/fonts/wak-medium.otf"),
  });
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-red-300 font-wakLight m-20">
        Open up App.js to start working on your app!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}
