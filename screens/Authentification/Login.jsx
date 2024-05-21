import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { app } from "../../firebaseConfig";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");
  const navigation = useNavigation();
  const auth = getAuth(app);

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, username, password)
      .then(() => {
        navigation.navigate("AuthenticatedApp");
      })
      .catch((error) => {
        setError("Identifiants ou mot de passe incorrects");
      });
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <View className="items-center justify-center px-4 py-8 mb-6">
        <Text className="text-5xl text-primary-beige font-wakExtraBold text-center w-64">
          Bon retour parmi nous !
        </Text>
        <Text className="text-xl text-primary-beige font-sansBold text-center mt-5">
          Connecte-toi à Bambou et réalise de nouvelles actions écolos !
        </Text>
        {error ? (
          <Text className="text-red-500 mt-4 text-base">{error}</Text>
        ) : null}
      </View>
      <View className="flex bg-primary-beige h-full">
        <View className="items-center p-12">
          <Text className="text-primary-green font-sans text-lg self-start">
            Pseudonyme ou email
          </Text>
          <TextInput
            className="font-sansBold w-80 bg-secondary-beige rounded-2xl p-4"
            placeholder="Ton pseudo ou email"
            value={username}
            onChangeText={setUsername}
          />
          <Text className="text-primary-green font-sans text-lg self-start mt-5">
            Mot de passe
          </Text>
          <View className="flex-row items-center w-80 bg-secondary-beige rounded-2xl">
            <TextInput
              className="flex-1 text-primary-green p-4 font-sansBold"
              placeholder="Ton mot de passe"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              className="p-3"
            >
              <Ionicons
                name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                size={24}
                color="#005B41"
              />
            </TouchableOpacity>
          </View>
        </View>
        {/* Login button */}
        <View className="w-full px-12 pb-12 mt-52">
          <TouchableOpacity
            className="bg-primary-yellow py-4 rounded-full items-center w-full"
            onPress={handleLogin}
          >
            <Text className="text-primary-beige text-lg font-sansBold">
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
