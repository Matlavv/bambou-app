import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthHome from "../Authentification/AuthHome";
import Login from "../Authentification/Login";
import SignUp from "../Authentification/SignUp";

const stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="AuthHome" component={AuthHome} />
      <stack.Screen name="Login" component={Login} />
      <stack.Screen name="SignUp" component={SignUp} />
    </stack.Navigator>
  );
};

export default AuthStack;
