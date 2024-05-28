import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { AuthContext, AuthProvider } from "./AuthContext";
import {
  articles,
  articlesBeige,
  calendar,
  calendarBeige,
  gift,
  giftBeige,
  home,
  homeBeige,
  social,
  socialBeige,
} from "./assets/icons/index";
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

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Profile" component={ProfileStack} />
    </Stack.Navigator>
  );
}

function AuthenticatedApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let icon;
          if (route.name === "HomeStack") {
            icon = focused ? homeBeige : home;
          } else if (route.name === "Gift") {
            icon = focused ? giftBeige : gift;
          } else if (route.name === "Event") {
            icon = focused ? calendarBeige : calendar;
          } else if (route.name === "Social") {
            icon = focused ? socialBeige : social;
          } else if (route.name === "Articles") {
            icon = focused ? articlesBeige : articles;
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
              <Image
                source={icon}
                style={{ width: 30, height: 30 }}
                resizeMode="contain"
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
        name="HomeStack"
        component={HomeStack}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            // Prevent default action
            e.preventDefault();
            // Navigate to HomeScreen
            navigation.navigate("HomeStack", { screen: "Home" });
          },
        })}
      />
      <Tab.Screen name="Event" component={EventsStack} />
      <Tab.Screen name="Social" component={SocialStack} />
      <Tab.Screen name="Articles" component={ArticlesStack} />
      <Tab.Screen name="Gift" component={GiftsStack} />
    </Tab.Navigator>
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
            isAuthenticated ? <AuthenticatedApp /> : <AuthStack />
          }
        </AuthContext.Consumer>
      </NavigationContainer>
    </AuthProvider>
  );
}
