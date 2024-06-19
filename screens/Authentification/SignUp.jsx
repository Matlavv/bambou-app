import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const navigateToSignUpName = () => {
    if (validateEmail() && validatePassword() && passwordsMatch()) {
      navigation.navigate("SignUpName", {
        email: email,
        password: password,
      });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (emailRegex.test(email)) {
      setEmailError("");
      return true;
    } else {
      setEmailError("Email invalide");
      return false;
    }
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(
        "Le mot de passe doit contenir au moins 6 caractères, une majuscule, un chiffre et un caractère spécial"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const passwordsMatch = () => {
    if (password !== passwordConfirm) {
      setPasswordError("Les mots de passe ne correspondent pas");
      return false;
    }
    return true;
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-green">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="items-center justify-center px-4 py-8 mb-3">
          <Text className="text-5xl text-primary-beige font-wakExtraBold text-center w-64">
            Inscription
          </Text>
          <Text className="text-xl text-primary-beige font-sansBold text-center mt-5">
            Crée ton compte sur Bambou !
          </Text>
        </View>
        <View className="flex bg-primary-beige h-full">
          <View className="items-center p-12">
            <Text className="text-primary-green font-sans text-lg self-start">
              Email
            </Text>
            <TextInput
              className={`font-sansBold w-80 bg-secondary-beige rounded-2xl p-4 ${
                emailError ? "border-red-500 border-2 rounded-xl" : ""
              }`}
              onChangeText={setEmail}
              value={email}
              placeholder="Ton adresse mail"
              onBlur={validateEmail}
            />
            {emailError && <Text className="text-red-500">{emailError}</Text>}
            <Text className="text-primary-green font-sans text-lg self-start mt-5">
              Mot de passe
            </Text>
            <View className="flex-row items-center w-80 bg-secondary-beige rounded-2xl">
              <TextInput
                className="flex-1 text-primary-green p-4 font-sansBold"
                onChangeText={setPassword}
                value={password}
                placeholder="Ton mot de passe"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{ padding: 10 }}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#005B41"
                />
              </TouchableOpacity>
            </View>
            {passwordError && (
              <Text className="text-red-500">{passwordError}</Text>
            )}
            <Text className="text-primary-green font-sans text-lg self-start mt-5">
              Confirmation du mot de passe
            </Text>
            <View className="flex-row items-center w-80 bg-secondary-beige rounded-2xl">
              <TextInput
                className="flex-1 text-primary-green p-4 font-sansBold"
                onChangeText={setPasswordConfirm}
                value={passwordConfirm}
                placeholder="Confirme ton mot de passe"
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                onPress={togglePasswordVisibility}
                style={{ padding: 10 }}
              >
                <Ionicons
                  name={passwordVisible ? "eye-off-outline" : "eye-outline"}
                  size={24}
                  color="#005B41"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View className="w-full px-12 pb-6 bg-primary-beige">
        <TouchableOpacity
          className="bg-primary-yellow py-4 rounded-full items-center w-full"
          onPress={navigateToSignUpName}
        >
          <Text className="text-primary-beige text-lg font-sansBold">
            Suivant
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
