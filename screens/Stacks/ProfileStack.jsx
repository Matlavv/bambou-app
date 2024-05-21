import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profil from "../Profile/Profile";
import Settings from "../Profile/Settings";
import SettingsPassword from "../Profile/SettingsPassword";
import SettingsUsername from "../Profile/SettingsUsername";

const stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Profil" component={Profil} />
      <stack.Screen name="Settings" component={Settings} />
      <stack.Screen name="SettingsPassword" component={SettingsPassword} />
      <stack.Screen name="SettingsUsername" component={SettingsUsername} />
    </stack.Navigator>
  );
};

export default ProfileStack;
