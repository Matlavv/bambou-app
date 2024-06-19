import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Social from "../Social/Social";

const stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Socials" component={Social} />
    </stack.Navigator>
  );
};

export default EventsStack;
