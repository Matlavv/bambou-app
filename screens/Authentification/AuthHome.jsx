import { useNavigation } from "@react-navigation/native";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { logo } from "../../assets/index";

const AuthHome = () => {
  const navigation = useNavigation();

  const navigateToLogin = () => {
    // Redirect to Login.jsx
    navigation.navigate("Login");
  };

  const navigateToGetStarted = () => {
    // Redirect to GetStarted1.jsx
    navigation.navigate("GetStarted1");
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <View className="flex-1 justify-between items-center">
        {/* Image container */}
        <View className="mt-52">
          <Image source={logo} className="w-30 h-30" />
        </View>
        {/* Buttons container */}
        <View className="w-full px-10 pb-10">
          {/* Signup button redirect to Start road */}
          <TouchableOpacity
            className="bg-primary-yellow py-4 rounded-full items-center mb-4"
            onPress={navigateToGetStarted}
          >
            <Text className="text-primary-beige text-lg font-sans">
              Commencer
            </Text>
          </TouchableOpacity>
          {/* Login Text redirect to Login.jsx */}
          <TouchableOpacity
            className="items-center mt-5"
            onPress={navigateToLogin}
          >
            <Text className="text-primary-beige font-sans font-bold text-lg">
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthHome;
