import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Gifts from "../Gifts/Gifts";

const stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Gifts" component={Gifts} />
    </stack.Navigator>
  );
};

export default EventsStack;
