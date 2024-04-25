import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import AuthStack from "./screens/Stacks/AuthStack";
import EventsStack from "./screens/Stacks/EventsStack";
import GiftsStack from "./screens/Stacks/GiftsStack";

async function loadFonts() {
  await Font.loadAsync({
    "GillSans-Regular": require("./assets/fonts/gill-sans1.ttf"),
    "GillSans-Bold": require("./assets/fonts/gill-sans-2.ttf"),
    "Wak-Light": require("./assets/fonts/wak-light.otf"),
    "Wak-Medium": require("./assets/fonts/wak-medium.otf"),
    "Wak-Bold": require("./assets/fonts/wak-bold.otf"),
    "Wak-ExtraBold": require("./assets/fonts/wak-extrabold.otf"),
  });
}

const Tab = createBottomTabNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF0E1",
    primaryGreen: "#005B41",
    primaryBeige: "#FFF0E1",
  },
};

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
    <NavigationContainer theme={MyTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === "Auth") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Gift") {
              iconName = focused ? "gift" : "gift-outline";
            } else if (route.name === "Event") {
              iconName = focused ? "calendar" : "calendar-outline";
            }

            return (
              <View
                style={{
                  width: 40, // Taille du cercle autour de l'icône
                  height: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 20,
                  backgroundColor: focused
                    ? MyTheme.colors.primaryGreen
                    : "transparent", // Cercle vert autour lors de la sélection
                }}
              >
                <Ionicons
                  name={iconName}
                  size={size}
                  color={
                    focused
                      ? MyTheme.colors.primaryBeige
                      : MyTheme.colors.primaryGreen
                  }
                />
              </View>
            );
          },
          tabBarShowLabel: false,
          headerShown: false,
          tabBarLabelStyle: {
            paddingBottom: 10,
            fontSize: 10,
            marginTop: -5,
          },
          tabBarStyle: [
            {
              backgroundColor: "#FFF0E1",
              display: "flex",
              height: 70,
            },
            null,
          ],
        })}
      >
        <Tab.Screen
          name="Auth"
          component={AuthStack}
          options={{ tabBarStyle: { display: "none" } }} // Cache la barre de navigation pour AuthStack
        />
        <Tab.Screen name="Event" component={EventsStack} />
        <Tab.Screen name="Gift" component={GiftsStack} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
