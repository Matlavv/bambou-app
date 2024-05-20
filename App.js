import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { AuthContext, AuthProvider } from "./AuthContext";
import HomeScreen from "./screens/HomeScreen";
import ArticlesStack from "./screens/Stacks/ArticlesStack";
import AuthStack from "./screens/Stacks/AuthStack";
import EventsStack from "./screens/Stacks/EventsStack";
import GiftsStack from "./screens/Stacks/GiftsStack";
import ProfileStack from "./screens/Stacks/ProfileStack";
import SocialStack from "./screens/Stacks/SocialStack";

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
const Stack = createNativeStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFF0E1",
    primaryGreen: "#005B41",
    primaryBeige: "#FFF0E1",
  },
};

function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "HomeScreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Gift") {
            iconName = focused ? "gift" : "gift-outline";
          } else if (route.name === "Event") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Social") {
            iconName = focused ? "apps" : "apps-outline";
          } else if (route.name === "Articles") {
            iconName = focused ? "newspaper" : "newspaper-outline";
          }

          return (
            <View
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 20,
                backgroundColor: focused
                  ? MyTheme.colors.primaryGreen
                  : "transparent",
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
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="Event" component={EventsStack} />
      <Tab.Screen name="Social" component={SocialStack} />
      <Tab.Screen name="Articles" component={ArticlesStack} />
      <Tab.Screen name="Gift" component={GiftsStack} />
    </Tab.Navigator>
  );
}

function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AuthenticatedApp" component={AuthenticatedApp} />
      <Stack.Screen name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer theme={MyTheme}>
        <AuthContext.Consumer>
          {({ isAuthenticated }) =>
            isAuthenticated ? <MainNavigator /> : <AuthStack />
          }
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  );
}
