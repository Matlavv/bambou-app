import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profil from "../Profile/Profile";

const stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Profil" component={Profil} />
    </stack.Navigator>
  );
};

export default ProfileStack;
