import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthHome from "../Authentification/AuthHome";
import GetStarted1 from "../Authentification/GetStarted/GetStarted1";
import GetStarted2 from "../Authentification/GetStarted/GetStarted2";
import GetStarted3 from "../Authentification/GetStarted/GetStarted3";
import Login from "../Authentification/Login";
import SignUp from "../Authentification/SignUp";
import SignUpName from "../Authentification/SignUpName";

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
      <stack.Screen name="SignUpName" component={SignUpName} />
      <stack.Screen name="GetStarted1" component={GetStarted1} />
      <stack.Screen name="GetStarted2" component={GetStarted2} />
      <stack.Screen name="GetStarted3" component={GetStarted3} />
    </stack.Navigator>
  );
};

export default AuthStack;
