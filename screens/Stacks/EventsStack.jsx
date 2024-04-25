import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Events from "../Events/Events";

const stack = createNativeStackNavigator();

const EventsStack = () => {
  return (
    <stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <stack.Screen name="Events" component={Events} />
    </stack.Navigator>
  );
};

export default EventsStack;
