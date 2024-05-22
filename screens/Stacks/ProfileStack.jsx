import { createNativeStackNavigator } from "@react-navigation/native-stack";
import EditBiography from "../Profile/EditProfile/EditBiography";
import EditEmail from "../Profile/EditProfile/EditEmail";
import EditPassword from "../Profile/EditProfile/EditPassword";
import EditUsername from "../Profile/EditProfile/EditUsername";
import Profil from "../Profile/Profile";
import Settings from "../Profile/Settings";

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
      <stack.Screen name="EditEmail" component={EditEmail} />
      <stack.Screen name="EditPassword" component={EditPassword} />
      <stack.Screen name="EditUsername" component={EditUsername} />
      <stack.Screen name="EditBiography" component={EditBiography} />
    </stack.Navigator>
  );
};

export default ProfileStack;
