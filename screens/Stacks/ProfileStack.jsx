import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "../Stacks/ProfileStack";

const stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Profile" component={Profile} />
    </stack.Navigator>
  );
};

export default ProfileStack;
